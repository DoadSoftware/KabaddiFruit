package com.kabaddi.controller;

import java.io.File;
import java.io.FileFilter;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kabaddi.model.Api_Match;
import com.kabaddi.model.Api_pre_match;
import com.kabaddi.model.Clock;
import com.kabaddi.model.EventFile;
import com.kabaddi.model.Match;
import com.kabaddi.model.Player;
import com.kabaddi.model.Team;
import com.kabaddi.service.KabaddiService;
import com.kabaddi.util.KabaddiFunctions;
import com.kabaddi.util.KabaddiUtil;
import com.kabaddi.containers.*;

import net.sf.json.JSONObject;

@Controller
public class IndexController 
{
	@Autowired
	KabaddiService kabaddiService;

	public static Configurations session_Configurations;
	public static Clock session_clock = new Clock();
	public static Match session_match;
	public static Team hometeam ,awayTeam;
	public static EventFile session_event;
	public static String session_selected_broadcaster;

	@RequestMapping(value = {"/","/initialise"}, method={RequestMethod.GET,RequestMethod.POST}) 
	public String initialisePage(ModelMap model) throws JAXBException  
	{
		model.addAttribute("match_files", new File(KabaddiUtil.KABADDI_DIRECTORY + KabaddiUtil.MATCHES_DIRECTORY).listFiles(new FileFilter() {
			@Override
		    public boolean accept(File pathname) {
		        String name = pathname.getName().toLowerCase();
		        return name.endsWith(".json") && pathname.isFile();
		    }
		}));
		
		if(new File(KabaddiUtil.KABADDI_DIRECTORY + KabaddiUtil.CONFIGURATIONS_DIRECTORY + KabaddiUtil.FRUIT_XML).exists()) {
            session_Configurations = (Configurations)JAXBContext.newInstance(Configurations.class).createUnmarshaller().unmarshal(
                    new File(KabaddiUtil.KABADDI_DIRECTORY + KabaddiUtil.CONFIGURATIONS_DIRECTORY + KabaddiUtil.FRUIT_XML));
        } else {
            session_Configurations = new Configurations();
			JAXBContext.newInstance(Configurations.class).createMarshaller().marshal(session_Configurations, 
					new File(KabaddiUtil.KABADDI_DIRECTORY + KabaddiUtil.CONFIGURATIONS_DIRECTORY + KabaddiUtil.FRUIT_XML));
        }
		return "initialise";
	}

	@RequestMapping(value = {"/fruit"}, method={RequestMethod.GET,RequestMethod.POST}) 
	public String commentatorPage(ModelMap model,
			@RequestParam(value = "select_broadcaster", required = false, defaultValue = "") String selectBroadcaster,
			@RequestParam(value = "selectedMatch", required = false, defaultValue = "") String selectedmatch) 
					throws Exception
	{
		session_Configurations = new Configurations(selectedmatch, selectBroadcaster);
		
		JAXBContext.newInstance(Configurations.class).createMarshaller().marshal(session_Configurations,
				new File(KabaddiUtil.KABADDI_DIRECTORY + KabaddiUtil.CONFIGURATIONS_DIRECTORY + KabaddiUtil.FRUIT_XML));
		
		session_match = KabaddiFunctions.populateMatchVariables(kabaddiService, new ObjectMapper().readValue
				(new File(KabaddiUtil.KABADDI_DIRECTORY + KabaddiUtil.MATCHES_DIRECTORY + selectedmatch),
		        Match.class));	
		
		 session_match.setHomeTeam(kabaddiService.getTeam(KabaddiUtil.TEAM, String.valueOf(session_match.getHomeTeamId())));
		 session_match.setHomeTeam(kabaddiService.getTeam(KabaddiUtil.TEAM, String.valueOf(session_match.getAwayTeamId())));

		session_event = new ObjectMapper().readValue(new File(KabaddiUtil.KABADDI_DIRECTORY + KabaddiUtil.EVENT_DIRECTORY + 
				selectedmatch), EventFile.class);

		session_match.setEvents(session_event.getEvents());
		// JSON file for match
//		session_match.setApi_Match(new ObjectMapper().readValue(new File(KabaddiUtil.KABADDI_DIRECTORY + KabaddiUtil.DESTINATION_DIRECTORY +session_match.getMatchId() +"-in-match" 
//				+ KabaddiUtil.JSON_EXTENSION), Api_Match.class));
		session_selected_broadcaster = selectBroadcaster;
		
		switch (selectBroadcaster.toUpperCase()) {
		case "GIPKL":
			session_match.getApi_Match().setHomeTeam(session_match.getHomeTeam());
		    session_match.getApi_Match().setAwayTeam(session_match.getAwayTeam());
			 
			KabaddiFunctions.setMatch(session_match.getApi_Match(), session_match);
			
			break;
		default:
			KabaddiFunctions.setMatchApi(session_match.getApi_Match(), session_match);
			if(new File(KabaddiUtil.KABADDI_DIRECTORY + KabaddiUtil.DESTINATION_DIRECTORY + "pre-match_2m" + KabaddiUtil.JSON_EXTENSION).exists()) {
				ObjectMapper objectMapper = new ObjectMapper();
				
				try {
		            File file = new File(KabaddiUtil.KABADDI_DIRECTORY + KabaddiUtil.DESTINATION_DIRECTORY + "pre-match_2m" + KabaddiUtil.JSON_EXTENSION);
		            List<Api_pre_match> apiPreMatchList = objectMapper.readValue(file, new TypeReference<List<Api_pre_match>>() {});
		            session_match.setApi_PreMatch(apiPreMatchList);
		            
		        } catch (IOException e) {
		            e.printStackTrace();
		        }
			}
			break;
		}
		model.addAttribute("session_match", session_match);
		model.addAttribute("session_selected_broadcaster", session_selected_broadcaster);
		model.addAttribute("session_selected_broadcaster", session_Configurations.getBroadcaster());
		
		return "fruit";
	}
	
	@RequestMapping(value = {"/processKabaddiProcedures"}, method={RequestMethod.GET,RequestMethod.POST})    
	public @ResponseBody String processHandballProcedures(
			@RequestParam(value = "whatToProcess", required = false, defaultValue = "") String whatToProcess,
			@RequestParam(value = "valueToProcess", required = false, defaultValue = "") String valueToProcess) 
					throws Exception
	{	
		switch (whatToProcess.toUpperCase()) {
			
		case "READ-MATCH-THEN-CLOCK":
			
			if(session_match != null && !valueToProcess.equalsIgnoreCase(new SimpleDateFormat("dd-MM-yyyy HH:mm:ss").format(
					new File(KabaddiUtil.KABADDI_DIRECTORY + KabaddiUtil.MATCHES_DIRECTORY + session_match.getMatchFileName()).lastModified()))) {
				
				session_event = new ObjectMapper().readValue(new File(KabaddiUtil.KABADDI_DIRECTORY + KabaddiUtil.EVENT_DIRECTORY + 
						session_match.getMatchFileName()), EventFile.class);
				session_match = new ObjectMapper().readValue(new File(KabaddiUtil.KABADDI_DIRECTORY + KabaddiUtil.MATCHES_DIRECTORY + 
						session_match.getMatchFileName()), Match.class);

				session_match = KabaddiFunctions.populateMatchVariables(kabaddiService, new ObjectMapper().readValue
						(new File(KabaddiUtil.KABADDI_DIRECTORY + KabaddiUtil.MATCHES_DIRECTORY + session_match.getMatchFileName()),
				        Match.class));	
				session_match.setEvents(session_event.getEvents());
			}
			if (new File(KabaddiUtil.KABADDI_DIRECTORY + KabaddiUtil.CLOCK_JSON).exists()) {
			    try {
			        session_match.setClock(new ObjectMapper().readValue(new File(KabaddiUtil.KABADDI_DIRECTORY + KabaddiUtil.CLOCK_JSON), Clock.class));
			    } catch (IOException e) {
			        System.err.println("Error reading Clock JSON file: " + e.getMessage());
			    }
			} else {
			    System.err.println("Clock JSON file does not exist: " + new File(KabaddiUtil.KABADDI_DIRECTORY + KabaddiUtil.CLOCK_JSON).getAbsolutePath());
			}
			
			switch (session_selected_broadcaster.toUpperCase()) {
			case "GIPKL":
				session_match.getApi_Match().setHomeTeam(session_match.getHomeTeam());
			    session_match.getApi_Match().setAwayTeam(session_match.getAwayTeam());
				KabaddiFunctions.setMatch(session_match.getApi_Match(), session_match);
				
				break;
			default:
				KabaddiFunctions.setMatchApi(session_match.getApi_Match(), session_match);
				if(new File(KabaddiUtil.KABADDI_DIRECTORY + KabaddiUtil.DESTINATION_DIRECTORY + "pre-match_2m" + KabaddiUtil.JSON_EXTENSION).exists()) {
					ObjectMapper objectMapper = new ObjectMapper();
					
					try {
			            File file = new File(KabaddiUtil.KABADDI_DIRECTORY + KabaddiUtil.DESTINATION_DIRECTORY + "pre-match_2m" + KabaddiUtil.JSON_EXTENSION);
			            List<Api_pre_match> apiPreMatchList = objectMapper.readValue(file, new TypeReference<List<Api_pre_match>>() {});
			            session_match.setApi_PreMatch(apiPreMatchList);
			            
			        } catch (IOException e) {
			            e.printStackTrace();
			        }
				}
				break;
			}
			return JSONObject.fromObject(session_match).toString();
		default:
			return JSONObject.fromObject(session_match).toString();
		}
	}
}