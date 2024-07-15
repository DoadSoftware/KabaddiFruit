var homeColour='blue',awayColour='skyblue';awayTextColour='#000080',homeTextColour='white';
var raids,doDie;
function processWaitingButtonSpinner(whatToProcess) 
{
	switch (whatToProcess) {
	case 'START_WAIT_TIMER': 
		$('.spinner-border').show();
		$(':button').prop('disabled', true);
		break;
	case 'END_WAIT_TIMER': 
		$('.spinner-border').hide();
		$(':button').prop('disabled', false);
		break;
	}
}
function millisToMinutesAndSeconds(millis) {
  var m = Math.floor(millis / 60000);
  var s = ((millis % 60000) / 1000).toFixed(0);
  return (m < 10 ? '0' + m : m) + ":" + (s < 10 ? '0' + s : s);
}
function processKabaddiProcedures(whatToProcess)
{
	var valueToProcess;
	
	switch(whatToProcess) {
	case 'READ-MATCH-THEN-CLOCK':
		valueToProcess = $('#matchFileTimeStamp').val();
		break;
	}

	$.ajax({    
        type : 'Get',     
        url : 'processKabaddiProcedures.html',     
        data : 'whatToProcess=' + whatToProcess + '&valueToProcess=' + valueToProcess, 
        dataType : 'json',
        success : function(data) {
        	switch(whatToProcess) {
			case 'READ-MATCH-THEN-CLOCK':
				addItemsToList('LOAD_MATCH',data);
				break;
        	}
	    },    
	    error : function(e) {    
	  	 	console.log('Error occured in ' + whatToProcess + ' with error description = ' + e);     
	    }  
	      
	});
}
function addItemsToList(whatToProcess, dataToProcess)
{	
	switch (whatToProcess) {
	case 'LOAD_MATCH':
		raids = LastFiveRaids(dataToProcess);
		Colours(dataToProcess);
   		table1(dataToProcess);
   		table3(dataToProcess);
   		table2(dataToProcess);
   		processMatchData(dataToProcess);
    break;
		
	}
}
function checkEmpty(inputBox,textToShow) {

	var name = $(inputBox).attr('id');
	
	document.getElementById(name + '-validation').innerHTML = '';
	document.getElementById(name + '-validation').style.display = 'none';
	$(inputBox).css('border','');
	if(document.getElementById(name).value.trim() == '') {
		$(inputBox).css('border','#E11E26 4px solid');
		document.getElementById(name + '-validation').innerHTML = textToShow + ' required';
		document.getElementById(name + '-validation').style.display = '';
		document.getElementById(name).focus({preventScroll:false});
		return false;
	}
	return true;	
}

function table1(dataToProcess){
	 $('#tables').empty();
    var tableHeight = "130px";
	
    // First Table
    var table1 = document.createElement('table');
    table1.id = 'table1';
    table1.style.height = tableHeight;
    table1.style.width = "50%";
    table1.style.marginTop = "-10px";
    table1.style.borderColor = "transparent";
    table1.className = 'table table-bordered fixed-size-table';
	table1.style.tableLayout = 'fixed'; 
    var thead1 = document.createElement('thead');
    var tbody1 = document.createElement('tbody');
    var tr1_1 = document.createElement('tr');
    var tr1_2 = document.createElement('tr');
   
    // First Table: First Row (headers)
    var th1_1 = document.createElement('th');
    th1_1.scope = 'col';
    th1_1.style.color = homeTextColour;
    th1_1.style.textAlign = 'center';
    th1_1.style.fontSize = '30px';
    th1_1.style.lineHeight = '1.3'; 
	th1_1.style.whiteSpace = 'nowrap'; 
    th1_1.style.fontWeight = 'bold';
    th1_1.style.fontWeight = 'bold';
    th1_1.style.backgroundColor = homeColour
    th1_1.style.borderColor = "transparent";
    th1_1.style.width = '50%';
    th1_1.style.height = '50%';
    th1_1.style.borderRight = 'none'; 
    th1_1.id = 'homeTeamName';
    th1_1.innerHTML = ' <br>';
    tr1_1.appendChild(th1_1);

    var th1_2 = document.createElement('th');
    th1_2.scope = 'col';
    th1_2.style.color = awayTextColour;
    th1_2.style.textAlign = 'center';
    th1_2.style.fontSize = '30px';
    th1_2.style.lineHeight = '1.1'; 
	th1_2.style.whiteSpace = 'nowrap'; 
    th1_2.style.fontWeight = 'bold';
    th1_2.style.fontWeight = 'bold';
    th1_2.style.borderColor = "transparent"
    th1_2.style.backgroundColor = awayColour
    th1_2.style.width = '50%';
    th1_2.style.height = '50%';
    th1_2.style.borderRight = 'none'; 
    th1_2.id = 'awayTeamName';
    th1_2.innerHTML = '<br>';
    tr1_2.appendChild(th1_2);

   // First Table: Second Row (data)
    var td1_1 = document.createElement('th');
    td1_1.style.textAlign = 'center';
    td1_1.style.fontSize = '38px';
    td1_1.style.lineHeight = '1.3'; 
	td1_1.style.whiteSpace = 'nowrap'; 
    td1_1.style.fontWeight = 'bold';
    td1_1.style.color = homeTextColour;
    td1_1.style.textAlign = 'center';
    td1_1.style.fontWeight = 'bold';
    td1_1.style.backgroundColor = homeColour
    td1_1.style.width = '50%';
    td1_1.style.height = '50%'
    td1_1.id = 'homescore';
    td1_1.style.borderLeft = 'none';
    td1_1.innerHTML = '<br>'; 
    tr1_1.appendChild(td1_1);

    var td1_2 = document.createElement('th');
    td1_2.style.textAlign = 'center';
    td1_2.style.fontSize = '38px';
    td1_2.style.lineHeight = '1.1'; 
	td1_2.style.whiteSpace = 'nowrap'; 
    td1_2.style.fontWeight = 'bold';
    td1_2.style.color = awayTextColour;
    td1_2.style.textAlign = 'center';
    td1_2.style.fontWeight = 'bold';
    td1_2.style.width = '50%';
    td1_2.style.height = '50%'
    td1_2.style.backgroundColor = awayColour
    td1_2.style.borderLeft = 'none';
    td1_2.id = 'awayscore';
    td1_2.innerHTML = '<br>'; 
    tr1_2.appendChild(td1_2);

    thead1.appendChild(tr1_1);
    tbody1.appendChild(tr1_2);
    table1.appendChild(thead1);
    table1.appendChild(tbody1);

    // Second Table
    var table2 = document.createElement('table');
	table2.id = 'table2';
	table2.style.height = "200px"; 
	table2.style.width = "20%";
	table2.style.marginTop = "-10px";
	table2.style.border = "4px solid #F0F0F0";
	table2.className = 'table table-bordered fixed-size-table';
	table2.style.tableLayout = 'fixed'; 
	var thead2 = document.createElement('thead');
	var tbody2 = document.createElement('tbody');
	var tr2_1 = document.createElement('tr');
	
	// Second Table: First Row (header and spanning cell)
	var th2_1_1 = document.createElement('th');
	th2_1_1.scope = 'col';
	th2_1_1.style.color = 'white';
	th2_1_1.style.textAlign = 'center';
	th2_1_1.style.lineHeight = '1.1'; 
	th2_1_1.style.whiteSpace = 'nowrap'; 
    th2_1_1.style.fontWeight = 'bold';
	th2_1_1.style.fontSize = '30px';
	th2_1_1.style.fontWeight = 'bold';
	th2_1_1.style.borderColor = "transparent";
	th2_1_1.style.wordWrap = "break-word"; 
	th2_1_1.style.overflow = "hidden"; 
	th2_1_1.style.backgroundColor = '#636363'
	th2_1_1.style.textOverflow = "hidden"; 
	th2_1_1.style.width = '10%';
	th2_1_1.style.height = '130px';
	th2_1_1.innerHTML = '<br>';
	th2_1_1.id = 'tournament';
	th2_1_1.setAttribute('rowspan', 2); 
	tr2_1.appendChild(th2_1_1);
	
	thead2.appendChild(tr2_1);
	table2.appendChild(thead2);
	table2.appendChild(tbody2);
	
	// Append table2 to the container
	var tableContainer = document.getElementById('tables');
		tableContainer.appendChild(table2);
	// Third Table
	var table3 = document.createElement('table');
	table3.id = 'table3';
	table3.style.height = '130px';
	table3.style.width = "30%";
	table3.style.border = "4px solid #F0F0F0";
	table3.style.marginTop = "-10px";
	table3.style.borderColor = "transparent";
	table3.className = 'table table-bordered fixed-size-table';
	table3.style.tableLayout = 'fixed'; 
	var thead3 = document.createElement('thead');
	var tbody3 = document.createElement('tbody');
	var tr3_1 = document.createElement('tr');
	var tr3_2 = document.createElement('tr');
	var tr3_3 = document.createElement('tr');

	// Third Table: First Row (headers)
	var th3_1 = document.createElement('td');
	th3_1.scope = 'col';
	th3_1.style.color = 'white';
	th3_1.style.textAlign = 'center';
	th3_1.style.border = "4px solid #F0F0F0";
	th3_1.style.fontSize = '24px';
	th3_1.style.lineHeight = '1.3'; 
	th3_1.style.whiteSpace = 'nowrap';
	th3_1.style.backgroundColor = '#636363'
	th3_1.style.fontWeight = 'bold';
	th3_1.style.width = '40%';
	th3_1.innerHTML = 'ALL OUT';
	tr3_1.appendChild(th3_1);
	
	var th3_2 = document.createElement('td');
	th3_2.scope = 'col';
	th3_2.style.color = homeTextColour;
	th3_2.style.textAlign = 'center';
	th3_2.style.lineHeight = '1.3'; 
	th3_2.style.whiteSpace = 'nowrap';
	th3_2.style.backgroundColor = homeColour
	th3_2.style.border = "4px solid #F0F0F0";
	th3_2.style.fontSize = '24px';
	th3_2.style.fontWeight = 'bold';
	th3_2.style.width = '33.33%';
	th3_2.innerHTML = '<br>';
	th3_2.id = 'home_allOut';
	tr3_1.appendChild(th3_2);
	
	var th3_3 = document.createElement('td');
	th3_3.scope = 'col';
	th3_3.style.color = awayTextColour;
	th3_3.style.textAlign = 'center';
	th3_3.style.border = "4px solid #F0F0F0";
	th3_3.style.fontSize = '24px';
	th3_3.style.lineHeight = '1.3'; 
	th3_3.style.whiteSpace = 'nowrap';
	th3_3.style.fontWeight = 'bold';
	th3_3.style.backgroundColor = awayColour
	th3_3.style.width = '33.33%';
	th3_3.innerHTML = '<br>';
	th3_3.id = 'away_allOut';
	tr3_1.appendChild(th3_3);
	
	// Third Table: Second Row (data)
	var td3_1 = document.createElement('td');
	td3_1.style.textAlign = 'center';
	td3_1.style.color = 'white';
	td3_1.style.border = "4px solid #F0F0F0";
	td3_1.style.lineHeight = '1.1'; 
	td3_1.style.whiteSpace = 'nowrap';
	td3_1.style.fontSize = '24px';
	td3_1.style.fontWeight = 'bold';
	td3_1.style.backgroundColor = '#636363'
	td3_1.style.width = '33.33%';
	td3_1.style.height = '50%';
	td3_1.innerHTML = 'EXTRAS'; 
	tr3_2.appendChild(td3_1);
	
	var td3_2 = document.createElement('td');
	td3_2.style.color = homeTextColour;
	td3_2.style.textAlign = 'center';
	td3_2.style.border = "4px solid #F0F0F0";
	td3_2.style.fontSize = '24px';
	td3_2.style.lineHeight = '1.1'; 
	td3_2.style.whiteSpace = 'nowrap';
	td3_2.style.fontWeight = 'bold';
	td3_2.style.width = '33.33%';
	td3_2.style.backgroundColor = homeColour
	td3_2.id = 'home_extra';
	td3_2.style.height = '50%';
	td3_2.innerHTML = '<br>'; 
	tr3_2.appendChild(td3_2);
	
	var td3_3 = document.createElement('td');
	td3_3.style.color = awayTextColour;
	td3_3.style.textAlign = 'center';
	td3_3.style.fontSize = '24px';
	td3_3.style.border = "4px solid #F0F0F0";
	td3_3.style.lineHeight = '1.1'; 
	td3_3.style.whiteSpace = 'nowrap';
	td3_3.style.fontWeight = 'bold';
	td3_3.style.width = '33.33%';
	td3_3.style.backgroundColor = awayColour
	td3_3.id = 'away_extra';
	td3_3.style.height = '50%';
	td3_3.innerHTML = '<br>'; 
	tr3_2.appendChild(td3_3);
	
	// Third Table: Third Row (data)
	var td3_4 = document.createElement('td');
	td3_4.style.color = 'white';
	td3_4.style.textAlign = 'center';
	td3_4.style.fontSize = '24px';
	td3_4.style.lineHeight = '1.1'; 
	td3_4.style.border = "4px solid #F0F0F0";
	td3_4.style.whiteSpace = 'nowrap';
	td3_4.style.fontWeight = 'bold';
	td3_4.style.backgroundColor = '#636363'
	td3_4.style.width = '33.33%';
	td3_4.style.height = '50%';
	td3_4.innerHTML = 'BONUS'; 
	tr3_3.appendChild(td3_4);
	
	var td3_5 = document.createElement('td');
	td3_5.style.color = homeTextColour;
	td3_5.style.textAlign = 'center';
	td3_5.style.fontSize = '24px';
	td3_5.style.border = "4px solid #F0F0F0";
	td3_5.style.lineHeight = '1.1'; 
	td3_5.style.whiteSpace = 'nowrap';
	td3_5.style.fontWeight = 'bold';
	td3_5.style.width = '33.33%';
	td3_5.style.backgroundColor = homeColour
	td3_5.id = 'home_bonus';
	td3_5.style.height = '50%';
	td3_5.innerHTML = '<br>'; 
	tr3_3.appendChild(td3_5);
	
	var td3_6 = document.createElement('td');
	td3_6.style.color = awayTextColour;
	td3_6.style.textAlign = 'center';
	td3_6.style.fontSize = '24px';
	td3_6.style.border = "4px solid #F0F0F0";
	td3_6.style.lineHeight = '1.1'; 
	td3_6.style.whiteSpace = 'nowrap';
	td3_6.style.fontWeight = 'bold';
	td3_6.style.backgroundColor = awayColour
	td3_6.style.width = '33.33%';
	td3_6.id = 'away_bonus';
	td3_6.style.height = '50%';
	td3_6.innerHTML = '<br>'; 
	tr3_3.appendChild(td3_6);
	
	thead3.appendChild(tr3_1);
	tbody3.appendChild(tr3_2);
	tbody3.appendChild(tr3_3);
	table3.appendChild(thead3);
	table3.appendChild(tbody3);



    // Fourth Table
    var table4 = document.createElement('table');
    table4.id = 'table4';
    table4.style.height = tableHeight;
    table4.style.width = "30%";
    table4.style.marginTop = "-9px";
    table4.style.borderColor = "transparent";
    table4.className = 'table table-bordered fixed-size-table';
 	table4.style.tableLayout = 'fixed'; 
    var thead4 = document.createElement('thead');
    var tbody4 = document.createElement('tbody');
    var tr4_1 = document.createElement('tr');
    var tr4_2 = document.createElement('tr');

    // Fourth Table: First Row (header and spanning cell)
    var th4_1_1 = document.createElement('th');
    th4_1_1.scope = 'col';
    th4_1_1.style.color = 'white';
    th4_1_1.style.textAlign = 'center';
    th4_1_1.style.fontSize = '30px';
    th4_1_1.style.lineHeight = '1.1'; 
	th4_1_1.style.whiteSpace = 'nowrap';
	th4_1_1.style.backgroundColor = '#636363'
	th4_1_1.style.border = "4px solid #F0F0F0";
    th4_1_1.style.fontWeight = 'bold';
    th4_1_1.style.width = '50%';
    th4_1_1.setAttribute('colspan', 2);
    th4_1_1.id = 'match_half';
    th4_1_1.innerHTML = '<br>';
    tr4_1.appendChild(th4_1_1);

    // Fourth Table: Second Row (data)
    var td4_1 = document.createElement('td');
    td4_1.style.textAlign = 'center';
    td4_1.style.color = 'white';
    td4_1.style.fontSize = '54px';
    td4_1.style.fontWeight = 'bold';
    td4_1.style.lineHeight = '1.1'; 
	td4_1.style.whiteSpace = 'nowrap';
	td4_1.style.backgroundColor = '#636363'
	td4_1.style.border = "4px solid #F0F0F0";
    td4_1.style.width = '50%';
    td4_1.style.height = '50%';
    td4_1.setAttribute('colspan', 2);
    td4_1.id = 'clock_timer';
    td4_1.innerHTML = '<br>'; 
    tr4_2.appendChild(td4_1);

    thead4.appendChild(tr4_1);
    tbody4.appendChild(tr4_2);
    table4.appendChild(thead4);
    table4.appendChild(tbody4);

    // Append tables to the container
    var tableContainer = document.getElementById('tables');
    tableContainer.appendChild(table1);
    tableContainer.appendChild(table2);
    tableContainer.appendChild(table3);
    tableContainer.appendChild(table4);
		var tableRowStyle = {
		    width: '50%', 
		    height: '50%', 
		    border: '4px solid #F0F0F0' 
		};
	
	// Applying styles to table rows for each table
	function applyStylesToRows(tableId) {
	    var table = document.getElementById(tableId);
	    var rows = table.getElementsByTagName('tr');
	    for (var i = 0; i < rows.length; i++) {
	        var row = rows[i];
	        Object.assign(row.style, tableRowStyle);
	    }
	}
	
	
	applyStylesToRows('table1');
	applyStylesToRows('table3');
	applyStylesToRows('table4');
	
	tableContainer.appendChild(table1);
	tableContainer.appendChild(table2);
	tableContainer.appendChild(table3);
	tableContainer.appendChild(table4);
	setDataInTableCells(dataToProcess);
}
function table2(dataToProcess) {
    $('#tables2').empty();
    var tableHeight = "400px";
raids = LastFiveRaids(dataToProcess);
var test = false, team = [], playerAPIIds = new Set();

if (!test && dataToProcess && dataToProcess.api_Match && dataToProcess.api_Match.homeTeamStats && dataToProcess.api_Match.homeTeamStats.playerStats) {
    dataToProcess.api_Match.homeTeamStats.playerStats.forEach(function(plyr) {
        if (dataToProcess.homeTeam.teamApiId == dataToProcess.api_Match.homeTeamStats.teamId) {
            dataToProcess.homeSquad.forEach(function(hm) {
                if (parseInt(hm.playerAPIId) === plyr.playerId && !playerAPIIds.has(hm.playerAPIId)) {
                    if (plyr.player_on_court != null && (plyr.player_on_court === true || plyr.player_on_court === "true")) {
                        var player = hm.jersey_number + " " + hm.full_name + "," + plyr.raids[0].totalRaids + "," + plyr.raids[0].successfulRaids + " / " + plyr.raids[0].emptyRaids + " / " + plyr.raids[0].unsuccessfulRaids + "," + plyr.points[0].raid_points[0].totalRaidPoints + "," + plyr.tackles[0].successfulTackles + " / " + plyr.tackles[0].totalTackles + "," + plyr.points[0].tackle_points[0].totalTacklePoints;
                        team.push(player);
                        playerAPIIds.add(hm.playerAPIId);
                    } else if (plyr.player_revival_order != null && plyr.player_revival_order.trim().length > 0) {
                        var player = hm.jersey_number + " " + hm.full_name + "," + plyr.raids[0].totalRaids + "," + plyr.raids[0].successfulRaids + " / " + plyr.raids[0].emptyRaids + " / " + plyr.raids[0].unsuccessfulRaids + "," + plyr.points[0].raid_points[0].totalRaidPoints + "," + plyr.tackles[0].successfulTackles + " / " + plyr.tackles[0].totalTackles + "," + plyr.points[0].tackle_points[0].totalTacklePoints;
                        team.push(player);
                        playerAPIIds.add(hm.playerAPIId);
                    }
                }
            });

            dataToProcess.homeSubstitutes.forEach(function(hm) {
                if (parseInt(hm.playerAPIId) === plyr.playerId && !playerAPIIds.has(hm.playerAPIId)) {
                    if (plyr.player_on_court != null && (plyr.player_on_court === true || plyr.player_on_court === "true")) {
                        var player = hm.jersey_number + " " + hm.full_name + " (SUBS)," + plyr.raids[0].totalRaids + "," + plyr.raids[0].successfulRaids + " / " + plyr.raids[0].emptyRaids + " / " + plyr.raids[0].unsuccessfulRaids + "," + plyr.points[0].raid_points[0].totalRaidPoints + "," + plyr.tackles[0].successfulTackles + " / " + plyr.tackles[0].totalTackles + "," + plyr.points[0].tackle_points[0].totalTacklePoints;
                        team.push(player);
                        playerAPIIds.add(hm.playerAPIId);
                    } else if (plyr.player_revival_order != null && plyr.player_revival_order.trim().length > 0) {
                        var player = hm.jersey_number + " " + hm.full_name + " (SUBS)," + plyr.raids[0].totalRaids + "," + plyr.raids[0].successfulRaids + " / " + plyr.raids[0].emptyRaids + " / " + plyr.raids[0].unsuccessfulRaids + "," + plyr.points[0].raid_points[0].totalRaidPoints + "," + plyr.tackles[0].successfulTackles + " / " + plyr.tackles[0].totalTackles + "," + plyr.points[0].tackle_points[0].totalTacklePoints;
                        team.push(player);
                        playerAPIIds.add(hm.playerAPIId);
                    }
                }
            });

            dataToProcess.homeOtherSquad.forEach(function(hm) {
                if (parseInt(hm.playerAPIId) === plyr.playerId && !playerAPIIds.has(hm.playerAPIId)) {
                    if (plyr.player_on_court != null && (plyr.player_on_court === true || plyr.player_on_court === "true")) {
                        var player = hm.jersey_number + " " + hm.full_name + "," + plyr.raids[0].totalRaids + "," + plyr.raids[0].successfulRaids + " / " + plyr.raids[0].emptyRaids + " / " + plyr.raids[0].unsuccessfulRaids + "," + plyr.points[0].raid_points[0].totalRaidPoints + "," + plyr.tackles[0].successfulTackles + " / " + plyr.tackles[0].totalTackles + "," + plyr.points[0].tackle_points[0].totalTacklePoints;
                        team.push(player);
                        playerAPIIds.add(hm.playerAPIId);
                    } else if (plyr.player_revival_order != null && plyr.player_revival_order.trim().length > 0) {
                        var player = hm.jersey_number + " " + hm.full_name + "," + plyr.raids[0].totalRaids + "," + plyr.raids[0].successfulRaids + " / " + plyr.raids[0].emptyRaids + " / " + plyr.raids[0].unsuccessfulRaids + "," + plyr.points[0].raid_points[0].totalRaidPoints + "," + plyr.tackles[0].successfulTackles + " / " + plyr.tackles[0].totalTackles + "," + plyr.points[0].tackle_points[0].totalTacklePoints;
                        team.push(player);
                        playerAPIIds.add(hm.playerAPIId);
                    }
                }
            });
        } else {
            dataToProcess.awaySquad.forEach(function(hm) {
                if (parseInt(hm.playerAPIId) === plyr.playerId && !playerAPIIds.has(hm.playerAPIId)) {
                    if (plyr.player_on_court != null && (plyr.player_on_court === true || plyr.player_on_court === "true")) {
                        var player = hm.jersey_number + " " + hm.full_name + "," + plyr.raids[0].totalRaids + "," + plyr.raids[0].successfulRaids + " / " + plyr.raids[0].emptyRaids + " / " + plyr.raids[0].unsuccessfulRaids + "," + plyr.points[0].raid_points[0].totalRaidPoints + "," + plyr.tackles[0].successfulTackles + " / " + plyr.tackles[0].totalTackles + "," + plyr.points[0].tackle_points[0].totalTacklePoints;
                        team.push(player);
                        playerAPIIds.add(hm.playerAPIId);
                    } else if (plyr.player_revival_order != null && plyr.player_revival_order.trim().length > 0) {
                        var player = hm.jersey_number + " " + hm.full_name + "," + plyr.raids[0].totalRaids + "," + plyr.raids[0].successfulRaids + " / " + plyr.raids[0].emptyRaids + " / " + plyr.raids[0].unsuccessfulRaids + "," + plyr.points[0].raid_points[0].totalRaidPoints + "," + plyr.tackles[0].successfulTackles + " / " + plyr.tackles[0].totalTackles + "," + plyr.points[0].tackle_points[0].totalTacklePoints;
                        team.push(player);
                        playerAPIIds.add(hm.playerAPIId);
                    }
                }
            });

            dataToProcess.awaySubstitutes.forEach(function(hm) {
                if (parseInt(hm.playerAPIId) === plyr.playerId && !playerAPIIds.has(hm.playerAPIId)) {
                    if (plyr.player_on_court != null && (plyr.player_on_court === true || plyr.player_on_court === "true")) {
                        var player = hm.jersey_number + " " + hm.full_name + " (SUBS)," + plyr.raids[0].totalRaids + "," + plyr.raids[0].successfulRaids + " / " + plyr.raids[0].emptyRaids + " / " + plyr.raids[0].unsuccessfulRaids + "," + plyr.points[0].raid_points[0].totalRaidPoints + "," + plyr.tackles[0].successfulTackles + " / " + plyr.tackles[0].totalTackles + "," + plyr.points[0].tackle_points[0].totalTacklePoints;
                        team.push(player);
                        playerAPIIds.add(hm.playerAPIId);
                    } else if (plyr.player_revival_order != null && plyr.player_revival_order.trim().length > 0) {
                        var player = hm.jersey_number + " " + hm.full_name + " (SUBS)," + plyr.raids[0].totalRaids + "," + plyr.raids[0].successfulRaids + " / " + plyr.raids[0].emptyRaids + " / " + plyr.raids[0].unsuccessfulRaids + "," + plyr.points[0].raid_points[0].totalRaidPoints + "," + plyr.tackles[0].successfulTackles + " / " + plyr.tackles[0].totalTackles + "," + plyr.points[0].tackle_points[0].totalTacklePoints;
                        team.push(player);
                        playerAPIIds.add(hm.playerAPIId);
                    }
                }
            });

            dataToProcess.awayOtherSquad.forEach(function(hm) {
                if (parseInt(hm.playerAPIId) === plyr.playerId && !playerAPIIds.has(hm.playerAPIId)) {
                    if (plyr.player_on_court != null && (plyr.player_on_court === true || plyr.player_on_court === "true")) {
                        var player = hm.jersey_number + " " + hm.full_name + "," + plyr.raids[0].totalRaids + "," + plyr.raids[0].successfulRaids + " / " + plyr.raids[0].emptyRaids + " / " + plyr.raids[0].unsuccessfulRaids + "," + plyr.points[0].raid_points[0].totalRaidPoints + "," + plyr.tackles[0].successfulTackles + " / " + plyr.tackles[0].totalTackles + "," + plyr.points[0].tackle_points[0].totalTacklePoints;
                        team.push(player);
                        playerAPIIds.add(hm.playerAPIId);
                    } else if (plyr.player_revival_order != null && plyr.player_revival_order.trim().length > 0) {
                        var player = hm.jersey_number + " " + hm.full_name + "," + plyr.raids[0].totalRaids + "," + plyr.raids[0].successfulRaids + " / " + plyr.raids[0].emptyRaids + " / " + plyr.raids[0].unsuccessfulRaids + "," + plyr.points[0].raid_points[0].totalRaidPoints + "," + plyr.tackles[0].successfulTackles + " / " + plyr.tackles[0].totalTackles + "," + plyr.points[0].tackle_points[0].totalTacklePoints;
                        team.push(player);
                        playerAPIIds.add(hm.playerAPIId);
                    }
                }
            });
        }
    });

    test = true;
}


    // Table 2
    var table2 = document.createElement('table');
    table2.id = 'table2';
    table2.style.height = tableHeight;
    table2.style.width = "4%";
    table2.style.marginTop = "-10px";
    table2.style.border = "4px solid #F0F0F0";
    table2.className = 'table table-bordered fixed-size-table';

    var tbody2 = document.createElement('tbody');
    var tr2 = document.createElement('tr');

    // Table 2: Single cell
    var td2 = document.createElement('td');
    td2.style.textAlign = 'center';
    td2.style.fontSize = '24px';
    td2.style.fontWeight = 'bold';
    td2.style.color = homeTextColour;
    td2.style.backgroundColor = homeColour
    td2.style.lineHeight = '1.3'; 
    td2.style.whiteSpace = 'nowrap';
    td2.innerHTML = '<br>'; // Example data
    td2.id = 'homeName';
    tr2.appendChild(td2);

    tbody2.appendChild(tr2);
    table2.appendChild(tbody2);

    // Table 1
   var table1 = document.createElement('table');
    table1.id = 'table1';
    table1.style.height = tableHeight; // Fixed height
    table1.style.width = "20%";
    table1.style.marginTop = "-10px";
    table1.style.borderColor = "transparent";
    table1.className = 'table table-bordered fixed-size-table';
    table1.style.tableLayout = 'fixed';

    var thead1 = document.createElement('thead');
    var tbody1 = document.createElement('tbody');

    // Table 1: First Row (headers)
    var tr1_1 = document.createElement('tr');
    var th1_1 = document.createElement('th');
    th1_1.style.border = "4px solid #F0F0F0";
    th1_1.scope = 'col';
    th1_1.style.color = homeTextColour;
    th1_1.style.textAlign = 'center';
    th1_1.style.lineHeight = '1.3'; 
	th1_1.style.whiteSpace = 'nowrap'; 
    th1_1.style.fontSize = '24px';
    th1_1.style.fontWeight = 'bold';
    th1_1.style.width = '70%';
    th1_1.style.backgroundColor = homeColour
    th1_1.setAttribute('colspan', 2);
    th1_1.innerHTML = ' TACKLES';
    tr1_1.appendChild(th1_1);
    thead1.appendChild(tr1_1);

		var tr1_3 = document.createElement('tr');
        tr1_3.style.borderTop = "4px solid #F0F0F0";

        var td1 = document.createElement('td');
        td1.scope = 'col';
        td1.style.color = homeTextColour;
        td1.style.textAlign = 'center';
        td1.style.lineHeight = '1.1'; 
		td1.style.whiteSpace = 'nowrap'; 
	    td1.style.fontSize = '24px';
        td1.style.fontWeight = 'bold';
        td1.style.width = '50%'; 
        td1.style.backgroundColor = homeColour
        td1.innerHTML = 'SUCCESS'; 
        tr1_3.appendChild(td1);

        var td2 = document.createElement('td');
        td2.scope = 'col';
        td2.style.color = homeTextColour;
        td2.style.textAlign = 'center';
        td2.style.lineHeight = '1.1'; 
		td2.style.whiteSpace = 'nowrap'; 
	    td2.style.fontSize = '24px';
        td2.style.fontWeight = 'bold';
        td2.style.width = '50%';
        td2.style.backgroundColor = homeColour 
        td2.innerHTML =  'PTS'; 
        tr1_3.appendChild(td2);

        tbody1.appendChild(tr1_3);
    // Adding rows dynamically to Table 1
    for (var i = 0; i < 7; i++) {
        var tr1_3 = document.createElement('tr');
        tr1_3.style.border = "4px solid #F0F0F0";

        var td1 = document.createElement('td');
        td1.style.border = "4px solid #F0F0F0";
        td1.scope = 'col';
        td1.style.color = homeTextColour;
        td1.style.textAlign = 'center';
		td1.style.lineHeight = '1.1'; 
		td1.style.whiteSpace = 'nowrap'; 
	    td1.style.fontSize = '24px';
	    td1.style.fontWeight = 'bold';
	    td1.style.backgroundColor = homeColour
        td1.style.width = '30%'; 
        td1.innerHTML =(team[i] && team[i].split(',')[4]) || "<br>"; 
        tr1_3.appendChild(td1);

        var td2 = document.createElement('td');
        td2.scope = 'col';
        td2.style.border = "4px solid #F0F0F0";
        td2.style.color = homeTextColour;
        td2.style.textAlign = 'center';
        td2.style.lineHeight = '1.1'; 
		td2.style.whiteSpace = 'nowrap'; 
	    td2.style.fontSize = '24px';
        td2.style.fontWeight = 'bold';
        td2.style.width = '30%'; 
        td2.style.backgroundColor = homeColour
        td2.innerHTML = (team[i] && team[i].split(',')[5]) || "<br>"; 
        tr1_3.appendChild(td2);

        tbody1.appendChild(tr1_3);
    }

    table1.appendChild(thead1);
    table1.appendChild(tbody1);

    // Table 3
    var table3 = document.createElement('table');
    table3.id = 'table3';
    table3.style.height = tableHeight;
    table3.style.width = "40%";
    table3.style.marginTop = "-10px";
    table3.style.borderColor = "transparent";
    table3.className = 'table table-bordered fixed-size-table';

    var thead3 = document.createElement('thead');
    var tbody3 = document.createElement('tbody');

    // Table 3: First Row (headers)
    var tr3_1 = document.createElement('tr');
    var th3_1 = document.createElement('th');
    th3_1.style.border = "4px solid #F0F0F0";
    th3_1.scope = 'col';
    th3_1.style.color = homeTextColour;
    th3_1.style.textAlign = 'center';
    th3_1.style.lineHeight = '1.3'; 
	th3_1.style.whiteSpace = 'nowrap'; 
    th3_1.style.fontSize = '24px';
    th3_1.style.fontWeight = 'bold';
    th3_1.style.width = '100%';
    th3_1.style.backgroundColor = homeColour
    th3_1.setAttribute('colspan', 3);
    th3_1.innerHTML = ' <br>';
    th3_1.id = 'home_head';
    tr3_1.appendChild(th3_1);
    thead3.appendChild(tr3_1);

    // Table 3: Second Row
    var tr3_2 = document.createElement('tr');
    var th3_2 = document.createElement('td');
    th3_2.scope = 'col';
    th3_2.style.color = homeTextColour;
    th3_2.style.textAlign = 'center';
    th3_2.style.lineHeight = '1.1'; 
	th3_2.style.whiteSpace = 'nowrap'; 
    th3_2.style.fontSize = '24px';
    th3_2.style.fontWeight = 'bold';
    th3_2.style.width = '33.33%';
    th3_2.innerHTML = 'RAIDS : ';
    th3_2.style.backgroundColor = homeColour
    th3_2.style.borderRight = 'none';
    th3_2.id = 'home_raids';
    tr3_2.appendChild(th3_2);

    var th3_3 = document.createElement('td');
    th3_3.scope = 'col';
    th3_3.style.color = homeTextColour;
    th3_3.style.textAlign = 'center';
    th3_3.style.lineHeight = '1.1'; 
	th3_3.style.whiteSpace = 'nowrap'; 
    th3_3.style.fontSize = '24px';
    th3_3.style.fontWeight = 'bold';
    th3_3.style.width = '33.33%';
    th3_3.style.backgroundColor = homeColour
    th3_3.style.borderRight = 'none';
    th3_3.style.borderLeft = 'none';
    th3_3.innerHTML = 'TACKLES : ';
    th3_3.id = 'home_tackle';
    tr3_2.appendChild(th3_3);

    var th3_4 = document.createElement('td');
    th3_4.scope = 'col';
    th3_4.style.color = homeTextColour;
    th3_4.style.textAlign = 'center';
    th3_4.style.lineHeight = '1.1'; 
	th3_4.style.whiteSpace = 'nowrap'; 
    th3_4.style.fontSize = '24px'; 
    th3_4.style.fontWeight = 'bold';
    th3_4.style.width = '33.33%'; 
    th3_4.style.backgroundColor = homeColour
    th3_4.style.borderLeft = 'none';
    th3_4.innerHTML = '';
    th3_4.id = 'home_others';
    tr3_2.appendChild(th3_4);

    thead3.appendChild(tr3_2);
    table3.appendChild(thead3);
   
    // Adding rows dynamically to Table 3
    for (var i = 0; i < 7; i++) {
        var tr3_3 = document.createElement('tr');
        var td3_1 = document.createElement('td');
        td3_1.style.borderTop = "4px solid #F0F0F0";
        td3_1.scope = 'col';
        td3_1.style.color = homeTextColour;
        td3_1.style.textAlign = 'left';
        td3_1.style.lineHeight = '1.1'; 
    	td3_1.style.whiteSpace = 'nowrap'; 
        td3_1.style.fontSize = '24px';
        td3_1.style.fontWeight = 'bold';
        td3_1.style.width = '33.33%';
        td3_1.style.backgroundColor = homeColour
        td3_1.setAttribute('colspan', 3);
        td3_1.innerHTML = (team[i] && team[i].split(',')[0]) || "<br>"
        td3_1.style.paddingLeft = '40px';
        tr3_3.appendChild(td3_1);
        tbody3.appendChild(tr3_3);
    }

    table3.appendChild(tbody3);

    // Table 4: RAIDS
	var table4 = document.createElement('table');
	table4.id = 'table4';
	table4.style.height = tableHeight;
	table4.style.width = "40%";
	table4.style.marginTop = "-10px";
	table4.style.borderColor = "transparent";
	table4.className = 'table table-bordered fixed-size-table';
	
	var thead4 = document.createElement('thead');
	var tbody4 = document.createElement('tbody');
	
	// Table 4: First Row (header)
	var tr4_1 = document.createElement('tr');
	var th4_1 = document.createElement('th');
	th4_1.style.border = "4px solid #F0F0F0";
	th4_1.scope = 'col';
	th4_1.style.color = homeTextColour;
	th4_1.style.textAlign = 'center';
	th4_1.style.lineHeight = '1.3'; 
	th4_1.style.whiteSpace = 'nowrap'; 
    th4_1.style.fontSize = '24px'; 
	th4_1.style.fontWeight = 'bold';
	th4_1.style.width = '100%';
	th4_1.style.backgroundColor = homeColour
	th4_1.setAttribute('colspan', 3);
	th4_1.innerHTML = `RAIDS${"&nbsp;".repeat(35)}LAST FIVE RAIDS : ${raids.homeRaids}`;
	tr4_1.appendChild(th4_1);
	thead4.appendChild(tr4_1);
	
	// Table 4: Second Row (sub-headers)
	var tr4_2 = document.createElement('tr');
	
	var th4_2 = document.createElement('td');
	th4_2.scope = 'col';
	th4_2.style.color = homeTextColour;
	th4_2.style.textAlign = 'center';
	th4_2.style.lineHeight = '1.1'; 
	th4_2.style.fontSize = '24px';
	th4_2.style.fontWeight = 'bold';
	th4_2.style.width = '33.33%';
	th4_2.style.backgroundColor = homeColour
	th4_2.innerHTML = 'NUMBER';
	th4_2.style.borderRight = 'none';
	tr4_2.appendChild(th4_2);
	
	var th4_3 = document.createElement('td');
	th4_3.scope = 'col';
	th4_3.style.color = homeTextColour;
	th4_3.style.textAlign = 'center';
	th4_3.style.lineHeight = '1.1'; 
	th4_3.style.whiteSpace = 'nowrap'; 
    th4_3.style.fontSize = '24px';
	th4_3.style.fontWeight = 'bold';
	th4_3.style.width = '33.33%';
	th4_3.innerHTML = 'SUC/EMP/UN';
	th4_3.style.backgroundColor = homeColour
	th4_3.style.borderRight = 'none';
	th4_3.style.borderLeft = 'none';
	tr4_2.appendChild(th4_3);
	
	var th4_4 = document.createElement('td');
	th4_4.scope = 'col';
	th4_4.style.color = homeTextColour;
	th4_4.style.textAlign = 'center';
	th4_4.style.lineHeight = '1.1'; 
	th4_4.style.whiteSpace = 'nowrap'; 
    th4_4.style.fontSize = '24px';
	th4_4.style.fontWeight = 'bold';
	th4_4.style.width = '33.33%';
	th4_4.style.backgroundColor = homeColour
	th4_4.innerHTML = 'PTS';
	th4_4.style.borderLeft = 'none';
	tr4_2.appendChild(th4_4);
	
	thead4.appendChild(tr4_2);
	table4.appendChild(thead4);
	
	// Adding rows dynamically to Table 4
	for (var i = 0; i < 7; i++) {
	    // First set of data rows
	    var tr4_3 = document.createElement('tr');
	    var td4_1 = document.createElement('td');
	    td4_1.style.border = "4px solid #F0F0F0";
	    td4_1.scope = 'col';
	    td4_1.style.color = homeTextColour;
	    td4_1.style.textAlign = 'center';
	    td4_1.style.lineHeight = '1.1'; 
		td4_1.style.whiteSpace = 'nowrap'; 
	    td4_1.style.fontSize = '24px';
	    td4_1.style.backgroundColor = homeColour
	    td4_1.style.fontWeight = 'bold';
	    td4_1.style.width = '33.33%';
	    td4_1.innerHTML = (team[i] && team[i].split(',')[1]) || "<br>" 
	    tr4_3.appendChild(td4_1);
	    tbody4.appendChild(tr4_3);
	
	    // Second set of data rows
	    var td4_2 = document.createElement('td');
	    td4_2.style.border = "4px solid #F0F0F0";
	    td4_2.scope = 'col';
	    td4_2.style.color = homeTextColour;
	    td4_2.style.textAlign = 'center';
	    td4_2.style.lineHeight = '1.1'; 
		td4_2.style.whiteSpace = 'nowrap'; 
	    td4_2.style.fontSize = '24px';
	    td4_2.style.fontWeight = 'bold';
	    td4_2.style.backgroundColor = homeColour
	    td4_2.style.width = '33.33%';
	    td4_2.innerHTML =(team[i] && team[i].split(',')[2]) || "<br>" 
	    tr4_3.appendChild(td4_2);
	    tbody4.appendChild(tr4_3);
	
	    // Third set of data rows
	    var td4_3 = document.createElement('td');
	    td4_3.style.border = "4px solid #F0F0F0";
	    td4_3.scope = 'col';
	    td4_3.style.color = homeTextColour;
	    td4_3.style.textAlign = 'center';
	    td4_3.style.lineHeight = '1.1'; 
		td4_3.style.whiteSpace = 'nowrap'; 
	    td4_3.style.fontSize = '24px';
	    td4_3.style.backgroundColor = homeColour
	    td4_3.style.fontWeight = 'bold';
	    td4_3.style.width = '33.33%';
	    td4_3.innerHTML = (team[i] && team[i].split(',')[3]) || "<br>" 
	    tr4_3.appendChild(td4_3);
	    tbody4.appendChild(tr4_3);
	}
	
	table4.appendChild(tbody4);

    // Table 5 (without borders)
 	var table5 = document.createElement('table');
    table5.id = 'table5';
    table5.style.height = tableHeight;
    table5.style.width = "3%";
    table5.style.marginTop = "-10px";
    table5.style.padding = '0';
    table5.style.borderCollapse = 'collapse'; 
    table5.style.border = "4px solid #F0F0F0"; 
    table5.className = 'table table-bordered fixed-size-table transparent-border';

    var tbody5 = document.createElement('tbody');
    var tr5 = document.createElement('tr');

    // Table 2: Single cell
    var td5 = document.createElement('td');
    td5.style.textAlign = 'center';
    td5.style.fontSize = '21px';
    td5.style.fontWeight = 'bold';
    td5.style.color = 'black';
    td5.style.lineHeight = '1'; 
    td5.style.whiteSpace = 'nowrap'; 
    td5.innerHTML = 'P<br>L<br>A<br>Y<br>E<br>R<br>S<br><br>O<br>N<br><br>C<br>O<br>U<br>R<br>T<br><br> ';
    td5.id = 'homecourt';
    tr5.appendChild(td5);

    tbody5.appendChild(tr5);
    table5.appendChild(tbody5);

    $('#tables2').append(table2);
    $('#tables2').append(table3);
    $('#tables2').append(table5);
    $('#tables2').append(table4);
    $('#tables2').append(table1);
    document.getElementById('home_tackle').innerHTML += dataToProcess.api_Match.homeTeamStats.tackles[0].totalTackles;
	document.getElementById('home_raids').innerHTML += dataToProcess.api_Match.homeTeamStats.raids[0].totalRaids;

    document.getElementById('homecourt').innerHTML = document.getElementById('homecourt').innerHTML +'<span style="font-size: 33px;">'+
    dataToProcess.api_Match.homeTeamStats.no_of_players_on_court+'</span>';
    document.getElementById('homeName').innerHTML ='<br>'+dataToProcess.homeTeam.teamBadge.split('').join('<br>');
}
function table3(dataToProcess) {
    $('#tables3').empty(); 
var test = false, team = [], playerAPIIds = new Set();

if (!test && dataToProcess && dataToProcess.api_Match && dataToProcess.api_Match.awayTeamStats && dataToProcess.api_Match.awayTeamStats.playerStats) {
    dataToProcess.api_Match.awayTeamStats.playerStats.forEach(function(plyr) {
        if (dataToProcess.awayTeam.teamApiId == dataToProcess.api_Match.awayTeamStats.teamId) {
            dataToProcess.awaySquad.forEach(function(hm) {
                if (parseInt(hm.playerAPIId) === plyr.playerId && !playerAPIIds.has(hm.playerAPIId)) {
                    if (plyr.player_on_court != null && (plyr.player_on_court === true || plyr.player_on_court === "true")) {
                        var player = hm.jersey_number + " " + hm.full_name + "," + plyr.raids[0].totalRaids + "," + plyr.raids[0].successfulRaids + " / " + plyr.raids[0].emptyRaids + " / " + plyr.raids[0].unsuccessfulRaids + "," + plyr.points[0].raid_points[0].totalRaidPoints + "," + plyr.tackles[0].successfulTackles + " / " + plyr.tackles[0].totalTackles + "," + plyr.points[0].tackle_points[0].totalTacklePoints;
                        team.push(player);
                        playerAPIIds.add(hm.playerAPIId);
                    } else if (plyr.player_revival_order != null && plyr.player_revival_order.trim().length > 0) {
                        var player = hm.jersey_number + " " + hm.full_name + "," + plyr.raids[0].totalRaids + "," + plyr.raids[0].successfulRaids + " / " + plyr.raids[0].emptyRaids + " / " + plyr.raids[0].unsuccessfulRaids + "," + plyr.points[0].raid_points[0].totalRaidPoints + "," + plyr.tackles[0].successfulTackles + " / " + plyr.tackles[0].totalTackles + "," + plyr.points[0].tackle_points[0].totalTacklePoints;
                        team.push(player);
                        playerAPIIds.add(hm.playerAPIId);
                    }
                }
            });

            dataToProcess.awaySubstitutes.forEach(function(hm) {
                if (parseInt(hm.playerAPIId) === plyr.playerId && !playerAPIIds.has(hm.playerAPIId)) {
                    if (plyr.player_on_court != null && (plyr.player_on_court === true || plyr.player_on_court === "true")) {
                        var player = hm.jersey_number + " " + hm.full_name + " (SUBS)," + plyr.raids[0].totalRaids + "," + plyr.raids[0].successfulRaids + " / " + plyr.raids[0].emptyRaids + " / " + plyr.raids[0].unsuccessfulRaids + "," + plyr.points[0].raid_points[0].totalRaidPoints + "," + plyr.tackles[0].successfulTackles + " / " + plyr.tackles[0].totalTackles + "," + plyr.points[0].tackle_points[0].totalTacklePoints;
                        team.push(player);
                        playerAPIIds.add(hm.playerAPIId);
                    } else if (plyr.player_revival_order != null && plyr.player_revival_order.trim().length > 0) {
                        var player = hm.jersey_number + " " + hm.full_name + " (SUBS)," + plyr.raids[0].totalRaids + "," + plyr.raids[0].successfulRaids + " / " + plyr.raids[0].emptyRaids + " / " + plyr.raids[0].unsuccessfulRaids + "," + plyr.points[0].raid_points[0].totalRaidPoints + "," + plyr.tackles[0].successfulTackles + " / " + plyr.tackles[0].totalTackles + "," + plyr.points[0].tackle_points[0].totalTacklePoints;
                        team.push(player);
                        playerAPIIds.add(hm.playerAPIId);
                    }
                }
            });

            dataToProcess.awayOtherSquad.forEach(function(hm) {
                if (parseInt(hm.playerAPIId) === plyr.playerId && !playerAPIIds.has(hm.playerAPIId)) {
                    if (plyr.player_on_court != null && (plyr.player_on_court === true || plyr.player_on_court === "true")) {
                        var player = hm.jersey_number + " " + hm.full_name + "," + plyr.raids[0].totalRaids + "," + plyr.raids[0].successfulRaids + " / " + plyr.raids[0].emptyRaids + " / " + plyr.raids[0].unsuccessfulRaids + "," + plyr.points[0].raid_points[0].totalRaidPoints + "," + plyr.tackles[0].successfulTackles + " / " + plyr.tackles[0].totalTackles + "," + plyr.points[0].tackle_points[0].totalTacklePoints;
                        team.push(player);
                        playerAPIIds.add(hm.playerAPIId);
                    } else if (plyr.player_revival_order != null && plyr.player_revival_order.trim().length > 0) {
                        var player = hm.jersey_number + " " + hm.full_name + "," + plyr.raids[0].totalRaids + "," + plyr.raids[0].successfulRaids + " / " + plyr.raids[0].emptyRaids + " / " + plyr.raids[0].unsuccessfulRaids + "," + plyr.points[0].raid_points[0].totalRaidPoints + "," + plyr.tackles[0].successfulTackles + " / " + plyr.tackles[0].totalTackles + "," + plyr.points[0].tackle_points[0].totalTacklePoints;
                        team.push(player);
                        playerAPIIds.add(hm.playerAPIId);
                    }
                }
            });
        } else {
            dataToProcess.homeSquad.forEach(function(hm) {
                if (parseInt(hm.playerAPIId) === plyr.playerId && !playerAPIIds.has(hm.playerAPIId)) {
                    if (plyr.player_on_court != null && (plyr.player_on_court === true || plyr.player_on_court === "true")) {
                        var player = hm.jersey_number + " " + hm.full_name + "," + plyr.raids[0].totalRaids + "," + plyr.raids[0].successfulRaids + " / " + plyr.raids[0].emptyRaids + " / " + plyr.raids[0].unsuccessfulRaids + "," + plyr.points[0].raid_points[0].totalRaidPoints + "," + plyr.tackles[0].successfulTackles + " / " + plyr.tackles[0].totalTackles + "," + plyr.points[0].tackle_points[0].totalTacklePoints;
                        team.push(player);
                        playerAPIIds.add(hm.playerAPIId);
                    } else if (plyr.player_revival_order != null && plyr.player_revival_order.trim().length > 0) {
                        var player = hm.jersey_number + " " + hm.full_name + "," + plyr.raids[0].totalRaids + "," + plyr.raids[0].successfulRaids + " / " + plyr.raids[0].emptyRaids + " / " + plyr.raids[0].unsuccessfulRaids + "," + plyr.points[0].raid_points[0].totalRaidPoints + "," + plyr.tackles[0].successfulTackles + " / " + plyr.tackles[0].totalTackles + "," + plyr.points[0].tackle_points[0].totalTacklePoints;
                        team.push(player);
                        playerAPIIds.add(hm.playerAPIId);
                    }
                }
            });

            dataToProcess.homeSubstitutes.forEach(function(hm) {
                if (parseInt(hm.playerAPIId) === plyr.playerId && !playerAPIIds.has(hm.playerAPIId)) {
                    if (plyr.player_on_court != null && (plyr.player_on_court === true || plyr.player_on_court === "true")) {
                        var player = hm.jersey_number + " " + hm.full_name + " (SUBS)," + plyr.raids[0].totalRaids + "," + plyr.raids[0].successfulRaids + " / " + plyr.raids[0].emptyRaids + " / " + plyr.raids[0].unsuccessfulRaids + "," + plyr.points[0].raid_points[0].totalRaidPoints + "," + plyr.tackles[0].successfulTackles + " / " + plyr.tackles[0].totalTackles + "," + plyr.points[0].tackle_points[0].totalTacklePoints;
                        team.push(player);
                        playerAPIIds.add(hm.playerAPIId);
                    } else if (plyr.player_revival_order != null && plyr.player_revival_order.trim().length > 0) {
                        var player = hm.jersey_number + " " + hm.full_name + " (SUBS)," + plyr.raids[0].totalRaids + "," + plyr.raids[0].successfulRaids + " / " + plyr.raids[0].emptyRaids + " / " + plyr.raids[0].unsuccessfulRaids + "," + plyr.points[0].raid_points[0].totalRaidPoints + "," + plyr.tackles[0].successfulTackles + " / " + plyr.tackles[0].totalTackles + "," + plyr.points[0].tackle_points[0].totalTacklePoints;
                        team.push(player);
                        playerAPIIds.add(hm.playerAPIId);
                    }
                }
            });

            dataToProcess.homeOtherSquad.forEach(function(hm) {
                if (parseInt(hm.playerAPIId) === plyr.playerId && !playerAPIIds.has(hm.playerAPIId)) {
                    if (plyr.player_on_court != null && (plyr.player_on_court === true || plyr.player_on_court === "true")) {
                        var player = hm.jersey_number + " " + hm.full_name + "," + plyr.raids[0].totalRaids + "," + plyr.raids[0].successfulRaids + " / " + plyr.raids[0].emptyRaids + " / " + plyr.raids[0].unsuccessfulRaids + "," + plyr.points[0].raid_points[0].totalRaidPoints + "," + plyr.tackles[0].successfulTackles + " / " + plyr.tackles[0].totalTackles + "," + plyr.points[0].tackle_points[0].totalTacklePoints;
                        team.push(player);
                        playerAPIIds.add(hm.playerAPIId);
                    } else if (plyr.player_revival_order != null && plyr.player_revival_order.trim().length > 0) {
                        var player = hm.jersey_number + " " + hm.full_name + "," + plyr.raids[0].totalRaids + "," + plyr.raids[0].successfulRaids + " / " + plyr.raids[0].emptyRaids + " / " + plyr.raids[0].unsuccessfulRaids + "," + plyr.points[0].raid_points[0].totalRaidPoints + "," + plyr.tackles[0].successfulTackles + " / " + plyr.tackles[0].totalTackles + "," + plyr.points[0].tackle_points[0].totalTacklePoints;
                        team.push(player);
                        playerAPIIds.add(hm.playerAPIId);
                    }
                }
            });
        }
    });

    test = true;
}
console.log(team);

	    var tableHeight = "400px";
	
	    // Table 1: TACKLES
	    var table1 = document.createElement('table');
	    table1.id = 'table1';
	    table1.style.height = tableHeight; // Fixed height
	    table1.style.width = "20%";
	    table1.style.marginTop = "-10px";
	    table1.style.borderColor = "transparent";
	    table1.className = 'table table-bordered fixed-size-table';
	    table1.style.tableLayout = 'fixed';
	
	    var thead1 = document.createElement('thead');
	    var tbody1 = document.createElement('tbody');
	
	    // Table 1: First Row (headers)
	    var tr1_1 = document.createElement('tr');
	    var th1_1 = document.createElement('th');
	    th1_1.style.border = "4px solid #F0F0F0";
	    th1_1.scope = 'col';
	    th1_1.style.color = awayTextColour;
	    th1_1.style.textAlign = 'center';
	    th1_1.style.lineHeight = '1.3'; 
		th1_1.style.whiteSpace = 'nowrap'; 
	    th1_1.style.fontSize = '24px';
	    th1_1.style.fontWeight = 'bold';
	    th1_1.style.width = '100%';
	    th1_1.style.backgroundColor = awayColour 
	    th1_1.setAttribute('colspan', 2);
	    th1_1.innerHTML = ' TACKLES';
	    tr1_1.appendChild(th1_1);
	    thead1.appendChild(tr1_1);

		var tr1_3 = document.createElement('tr');
        var td1 = document.createElement('td');
        td1.scope = 'col';
        td1.style.color = awayTextColour;
        td1.style.textAlign = 'center';
        td1.style.lineHeight = '1.1'; 
		td1.style.whiteSpace = 'nowrap'; 
	    td1.style.fontSize = '24px';
	    td1.style.backgroundColor = awayColour
        td1.style.fontWeight = 'bold';
        td1.style.width = '50%'; 
        td1.innerHTML = 'SUCCESS'; 
        tr1_3.appendChild(td1);

        var td2 = document.createElement('td');
        td2.scope = 'col';
        td2.style.color = awayTextColour;
        td2.style.textAlign = 'center';
		td2.style.lineHeight = '1.1'; 
		td2.style.whiteSpace = 'nowrap';
		td2.style.backgroundColor = awayColour 
	    td2.style.fontSize = '24px';
        td2.style.fontWeight = 'bold';
        td2.style.width = '50%'; 
        td2.innerHTML =  'PTS'; 
        tr1_3.appendChild(td2);

        tbody1.appendChild(tr1_3);
    // Adding rows dynamically to Table 1
    for (var i = 0; i < 7; i++) {
        var tr1_3 = document.createElement('tr');
        tr1_3.style.border = "4px solid #F0F0F0";

        var td1 = document.createElement('td');
        td1.style.border = "4px solid #F0F0F0";
        td1.scope = 'col';
        td1.style.color = awayTextColour;
        td1.style.textAlign = 'center';
        td1.style.lineHeight = '1.1'; 
		td1.style.whiteSpace = 'nowrap'; 
		td1.style.backgroundColor = awayColour 
	    td1.style.fontSize = '24px';
        td1.style.fontWeight = 'bold';
        td1.style.width = '50%'; 
        td1.innerHTML =(team[i] && team[i].split(',')[4]) || "<br>"; 
        tr1_3.appendChild(td1);

        var td2 = document.createElement('td');
        td2.style.border = "4px solid #F0F0F0";
        td2.scope = 'col';
        td2.style.color = awayTextColour;
        td2.style.textAlign = 'center';
        td2.style.lineHeight = '1.1'; 
		td2.style.whiteSpace = 'nowrap'; 
		td2.style.backgroundColor = awayColour 
	    td2.style.fontSize = '24px';
        td2.style.fontWeight = 'bold';
        td2.style.width = '50%'; 
        td2.innerHTML = (team[i] && team[i].split(',')[5]) || "<br>"; 
        tr1_3.appendChild(td2);

        tbody1.appendChild(tr1_3);
    }

    table1.appendChild(thead1);
    table1.appendChild(tbody1);

    // Table 2: Single cell
    var table2 = document.createElement('table');
    table2.id = 'table2';
    table2.style.height = '400px';
    table2.style.width = "4%";
    table2.style.marginTop = "-10px";
    table2.style.border = "4px solid #F0F0F0";
    table2.className = 'table table-bordered fixed-size-table';

    var tbody2 = document.createElement('tbody');
    var tr2 = document.createElement('tr');

    var td2 = document.createElement('td');
    td2.style.textAlign = 'center';
    td2.style.fontSize = '24px';
    td2.style.fontWeight = 'bold';
    td2.style.color = awayTextColour;
    td2.style.backgroundColor = awayColour 
    td2.style.lineHeight = '1.3'; 
    td2.style.whiteSpace = 'nowrap';
    td2.innerHTML = '<br>'; 
    td2.id = 'awayName';
    tr2.appendChild(td2);

    tbody2.appendChild(tr2);
    table2.appendChild(tbody2);

    // Table 3: RAIDS, TACKLE, OTHERS
    var table3 = document.createElement('table');
    table3.id = 'table3';
    table3.style.height = tableHeight;
    table3.style.width = "40%";
    table3.style.marginTop = "-10px";
    table3.style.borderColor = "transparent";
    table3.className = 'table table-bordered fixed-size-table';

    var thead3 = document.createElement('thead');
    var tbody3 = document.createElement('tbody');

    // Table 3: First Row (headers)
    var tr3_1 = document.createElement('tr');
    var th3_1 = document.createElement('th');
    th3_1.style.border = "4px solid #F0F0F0";
    th3_1.scope = 'col';
    th3_1.style.color = awayTextColour;
    th3_1.style.textAlign = 'center';
    th3_1.style.lineHeight = '1.3'; 
	th3_1.style.whiteSpace = 'nowrap'; 
    th3_1.style.fontSize = '24px';
    th3_1.style.backgroundColor = awayColour 
    th3_1.style.fontWeight = 'bold';
    th3_1.style.width = '100%';
    th3_1.setAttribute('colspan', 3);
    th3_1.innerHTML = '  <br>';
    th3_1.id = 'away_head';
    tr3_1.appendChild(th3_1);
    thead3.appendChild(tr3_1);

    // Table 3: Second Row
    var tr3_2 = document.createElement('tr');
    var th3_2 = document.createElement('td');
    th3_2.scope = 'col';
    th3_2.style.color = awayTextColour;
    th3_2.style.textAlign = 'center';
    th3_2.style.lineHeight = '1.1'; 
	th3_2.style.whiteSpace = 'nowrap'; 
    th3_2.style.fontSize = '24px';
    th3_2.style.fontWeight = 'bold';
    th3_2.style.backgroundColor = awayColour
    th3_2.style.width = '33.33%'; 
    th3_2.innerHTML = 'RAIDS : ';
    th3_2.style.borderRight = 'none';
    th3_2.id = 'away_raids';
    tr3_2.appendChild(th3_2);

    var th3_3 = document.createElement('td');
    th3_3.scope = 'col';
    th3_3.style.color = awayTextColour;
    th3_3.style.textAlign = 'center';
    th3_3.style.lineHeight = '1.1'; 
	th3_3.style.whiteSpace = 'nowrap'; 
    th3_3.style.fontSize = '24px';
    th3_3.style.fontWeight = 'bold';
    th3_3.style.backgroundColor = awayColour
    th3_3.style.width = '33.33%'; 
    th3_3.innerHTML = 'TACKLES : ';
    th3_3.style.borderRight = 'none';
    th3_3.style.borderLeft = 'none';
    th3_3.id = 'away_tackle';
    tr3_2.appendChild(th3_3);

    var th3_4 = document.createElement('td');
    th3_4.scope = 'col';
    th3_4.style.color = awayTextColour;
    th3_4.style.textAlign = 'center';
    th3_4.style.lineHeight = '1.1'; 
	th3_4.style.whiteSpace = 'nowrap'; 
    th3_4.style.fontSize = '24px'; 
    th3_4.style.fontWeight = 'bold';
    th3_4.style.backgroundColor = awayColour
    th3_4.style.width = '33.33%'; 
    th3_4.innerHTML = '';
    th3_4.style.borderLeft = 'none';
    th3_4.id = 'away_others';
    tr3_2.appendChild(th3_4);

    thead3.appendChild(tr3_2);
    table3.appendChild(thead3);

    // Adding rows dynamically to Table 3
    for (var i = 0; i < 7; i++) {
        var tr3_3 = document.createElement('tr');
        var td3_1 = document.createElement('td');
        td3_1.style.border = "4px solid #F0F0F0";
        td3_1.scope = 'col';
        td3_1.style.color = awayTextColour;
        td3_1.style.textAlign = 'left';
        td3_1.style.lineHeight = '1.1'; 
		td3_1.style.whiteSpace = 'nowrap'; 
		td3_1.style.backgroundColor = awayColour
	    td3_1.style.fontSize = '24px';
        td3_1.style.fontWeight = 'bold';
        td3_1.style.width = '33.33%';
        td3_1.setAttribute('colspan', 3);
        td3_1.innerHTML =(team[i] && team[i].split(',')[0]) || "<br>"
        td3_1.style.paddingLeft = '40px';
        tr3_3.appendChild(td3_1);
        tbody3.appendChild(tr3_3);
    }

    table3.appendChild(tbody3);

   // Table 4: RAIDS
	var table4 = document.createElement('table');
	table4.id = 'table4';
	table4.style.height = tableHeight;
	table4.style.width = "40%";
	table4.style.marginTop = "-10px";
	table4.style.borderColor = "transparent";
	table4.className = 'table table-bordered fixed-size-table';
	
	var thead4 = document.createElement('thead');
	var tbody4 = document.createElement('tbody');
	
	// Table 4: First Row (header)
	var tr4_1 = document.createElement('tr');
	var th4_1 = document.createElement('th');
	th4_1.style.border = "4px solid #F0F0F0";
	th4_1.scope = 'col';
	th4_1.style.color = awayTextColour;
	th4_1.style.textAlign = 'center';
	th4_1.style.lineHeight = '1.3'; 
	th4_1.style.whiteSpace = 'nowrap';
	th4_1.style.backgroundColor = awayColour 
    th4_1.style.fontSize = '24px';
	th4_1.style.fontWeight = 'bold';
	th4_1.style.width = '100%';
	th4_1.setAttribute('colspan', 3);
    th4_1.innerHTML = `RAIDS${"&nbsp;".repeat(35)}LAST FIVE RAIDS : ${raids.awayRaids}`;
	tr4_1.appendChild(th4_1);
	thead4.appendChild(tr4_1);
	
	// Table 4: Second Row (sub-headers)
	var tr4_2 = document.createElement('tr');
	
	var th4_2 = document.createElement('td');
	th4_2.scope = 'col';
	th4_2.style.color = awayTextColour;
	th4_2.style.textAlign = 'center';
	th4_2.style.lineHeight = '1.1'; 
	th4_2.style.whiteSpace = 'nowrap';
	th4_2.style.backgroundColor = awayColour 
    th4_2.style.fontSize = '24px';
	th4_2.style.fontWeight = 'bold';
	th4_2.style.width = '33.33%';
	th4_2.innerHTML = 'NUMBER';
	th4_2.style.borderRight = 'none';
	tr4_2.appendChild(th4_2);
	
	var th4_3 = document.createElement('td');
	th4_3.scope = 'col';
	th4_3.style.color = awayTextColour;
	th4_3.style.textAlign = 'center';
	th4_3.style.lineHeight = '1.1'; 
	th4_3.style.whiteSpace = 'nowrap'; 
    th4_3.style.fontSize = '24px';
    th4_3.style.backgroundColor = awayColour
	th4_3.style.fontWeight = 'bold';
	th4_3.style.width = '33.33%';
	th4_3.innerHTML = 'SUC/EMP/UN';
	th4_3.style.borderRight = 'none';
	th4_3.style.borderLeft = 'none';
	tr4_2.appendChild(th4_3);
	
	var th4_4 = document.createElement('td');
	th4_4.scope = 'col';
	th4_4.style.color = awayTextColour;
	th4_4.style.textAlign = 'center';
	th4_4.style.lineHeight = '1.1'; 
	th4_4.style.whiteSpace = 'nowrap';
	th4_4.style.fontWeight = 'bold'; 
    th4_4.style.fontSize = '24px';
	th4_4.style.width = '33.33%';
	th4_4.style.backgroundColor = awayColour
	th4_4.innerHTML = 'PTS';
	th4_4.style.borderLeft = 'none';
	tr4_2.appendChild(th4_4);
	
	thead4.appendChild(tr4_2);
	table4.appendChild(thead4);
	
	// Adding rows dynamically to Table 4
	for (var i = 0; i <7; i++) {
	    // First set of data rows
	    var tr4_3 = document.createElement('tr');
	    var td4_1 = document.createElement('td');
	    td4_1.style.border = "4px solid #F0F0F0";
	    td4_1.scope = 'col';
	    td4_1.style.color = awayTextColour;
	    td4_1.style.backgroundColor = awayColour
	    td4_1.style.textAlign = 'center';
		td4_1.style.lineHeight = '1.1'; 
		td4_1.style.whiteSpace = 'nowrap'; 
	    td4_1.style.fontSize = '24px';
	    td4_1.style.fontWeight = 'bold';
	    td4_1.style.width = '33.33%';
	    
	    td4_1.innerHTML = (team[i] && team[i].split(',')[1]) || "<br>" 
	    tr4_3.appendChild(td4_1);
	    tbody4.appendChild(tr4_3);
	
	    // Second set of data rows
	    var td4_2 = document.createElement('td');
	    td4_2.style.border = "4px solid #F0F0F0";
	    td4_2.scope = 'col';
	    td4_2.style.backgroundColor = awayColour
	    td4_2.style.color = awayTextColour;
	    td4_2.style.textAlign = 'center';
	    td4_2.style.lineHeight = '1.1'; 
		td4_2.style.whiteSpace = 'nowrap'; 
	    td4_2.style.fontSize = '24px';
	    td4_2.style.fontWeight = 'bold';
	    td4_2.style.width = '33.33%';
	    td4_2.innerHTML =(team[i] && team[i].split(',')[2]) || "<br>" 
	    tr4_3.appendChild(td4_2);
	    tbody4.appendChild(tr4_3);
	
	    // Third set of data rows
	    var td4_3 = document.createElement('td');
	    td4_3.style.border = "4px solid #F0F0F0";
	    td4_3.scope = 'col';
	    td4_3.style.backgroundColor = awayColour
	    td4_3.style.color = awayTextColour;
	    td4_3.style.textAlign = 'center';
	    td4_3.style.lineHeight = '1.1'; 
		td4_3.style.whiteSpace = 'nowrap'; 
	    td4_3.style.fontSize = '24px';
	    td4_3.style.fontWeight = 'bold';
	    td4_3.style.width = '33.33%';
	    td4_3.innerHTML = (team[i] && team[i].split(',')[3]) || "<br>" 
	    tr4_3.appendChild(td4_3);
	    tbody4.appendChild(tr4_3);
	}
	
	table4.appendChild(tbody4);


    // Table 5: Single cell without borders
    var table5 = document.createElement('table');
    table5.id = 'table5';
    table5.style.height = tableHeight;
    table5.style.width = "3%";
    table5.style.marginTop = "-10px";
    table5.style.padding = '0';
    table5.style.borderCollapse = 'collapse'; 
    table5.style.border = "4px solid #F0F0F0"; 
    table5.className = 'table table-bordered fixed-size-table transparent-border';

    var tbody5 = document.createElement('tbody');
    var tr5 = document.createElement('tr');

    var td5 = document.createElement('td');
    td5.style.textAlign = 'center';
    td5.style.fontSize = '21px';
    td5.style.fontWeight = 'bold';
    td5.style.color = 'black';
    td5.style.lineHeight = '1'; 
    td5.style.whiteSpace = 'nowrap'; 
    td5.innerHTML = 'P<br>L<br>A<br>Y<br>E<br>R<br>S<br><br>O<br>N<br><br>C<br>O<br>U<br>R<br>T<br><br> ';
    td5.id = 'awaycourt';
    tr5.appendChild(td5);

    tbody5.appendChild(tr5);
    table5.appendChild(tbody5);

    // Append all tables to #tables3
    $('#tables3').append(table2);
    $('#tables3').append(table3);
    $('#tables3').append(table5);
    $('#tables3').append(table4);
    $('#tables3').append(table1);

    // Update data dynamically
    document.getElementById('away_tackle').innerHTML += dataToProcess.api_Match.awayTeamStats.tackles[0].totalTackles;
    document.getElementById('away_raids').innerHTML += dataToProcess.api_Match.awayTeamStats.raids[0].totalRaids;
    //document.getElementById('away_others').innerHTML += dataToProcess.api_Match.awayTeamStats.no_of_players_on_court;

    document.getElementById('awaycourt').innerHTML += '<span style="font-size: 33px;">' + dataToProcess.api_Match.awayTeamStats.no_of_players_on_court + '</span>';
    document.getElementById('awayName').innerHTML = '<br>' + dataToProcess.awayTeam.teamBadge.split('').join('<br>');
}
function setDataInTableCells(dataToProcess) {
		
		if(dataToProcess && dataToProcess.clock && dataToProcess.clock.matchTotalMilliSeconds && dataToProcess.clock.matchTotalMilliSeconds) {
				document.getElementById('clock_timer').innerHTML = millisToMinutesAndSeconds(dataToProcess.clock.matchTotalMilliSeconds);
				if(document.getElementById('match_half')) {
					document.getElementById('match_half').innerHTML = '';
					if(dataToProcess.clock.matchHalves == 'first' || dataToProcess.clock.matchHalves == 'second'){
						document.getElementById('match_half').innerHTML = document.getElementById('match_half').innerHTML + 
							dataToProcess.clock.matchHalves.toUpperCase() + ' HALF';
					}else if(dataToProcess.clock.matchHalves == 'extra1' || dataToProcess.clock.matchHalves == 'extra1'){
						document.getElementById('match_half').innerHTML = document.getElementById('match_half').innerHTML + 'ET' + ' 1 ';
					}else if(dataToProcess.clock.matchHalves == 'extra2' || dataToProcess.clock.matchHalves == 'extra2'){
						document.getElementById('match_half').innerHTML +=  'ET'+ ' 2 ';
					}else if(dataToProcess.clock.matchHalves == 'half' || dataToProcess.clock.matchHalves == 'full'){
						document.getElementById('match_half').innerHTML += 
							dataToProcess.clock.matchHalves.toUpperCase() + ' TIME';
					}else{
						document.getElementById('match_half').innerHTML = document.getElementById('match_half').innerHTML + "<br>" + '';
					}
				}
			}

		document.getElementById('homescore').innerHTML = dataToProcess.homeTeamScore;
		document.getElementById('awayscore').innerHTML = dataToProcess.awayTeamScore;
				
	    // Set data in Table 1
	    document.getElementById('homeTeamName').innerHTML =dataToProcess.homeTeam.teamBadge;
	    document.getElementById('awayTeamName').innerHTML = dataToProcess.awayTeam.teamBadge;
	    
	    document.getElementById('tournament').innerHTML = 'UPKL 2024' + ' <br>' + dataToProcess.matchIdent + ' <br>';
	    
	    document.getElementById('home_allOut').innerHTML = dataToProcess.api_Match.homeTeamStats.points[0].all_out_points;
	    document.getElementById('away_allOut').innerHTML = dataToProcess.api_Match.awayTeamStats.points[0].all_out_points;
	    
	    document.getElementById('home_extra').innerHTML = dataToProcess.api_Match.homeTeamStats.points[0].extra_points;
	    document.getElementById('away_extra').innerHTML = dataToProcess.api_Match.awayTeamStats.points[0].extra_points;
	    
	    document.getElementById('home_bonus').innerHTML = dataToProcess.api_Match.homeTeamStats.do_or_die[0].bonusPoints;
	    document.getElementById('away_bonus').innerHTML = dataToProcess.api_Match.awayTeamStats.do_or_die[0].bonusPoints;
	    
  
}
function LastFiveRaids(dataToProcess) {
    var homeRaids = 0, awayRaids = 0, Homecount = 0, Awaycount = 0;

    if (dataToProcess && dataToProcess.api_Match && dataToProcess.api_Match.play_by_play && dataToProcess.api_Match.play_by_play.playByRaids) {
        for (var i = dataToProcess.api_Match.play_by_play.playByRaids.length - 1; i >= 0; i--) {
            var ply = dataToProcess.api_Match.play_by_play.playByRaids[i];

            if (Homecount < 5 && dataToProcess.homeTeam && dataToProcess.homeTeam.teamApiId == ply.raiding_team_id) {
                if (ply.team) {
                    ply.team.forEach(tm => {
                        if (ply.raiding_team_id == tm.team_id) homeRaids += tm.total_points;
                    });
                }
                Homecount++;
            }
            if (Awaycount < 5 && dataToProcess.awayTeam && dataToProcess.awayTeam.teamApiId == ply.raiding_team_id) {
                if (ply.team) {
                    ply.team.forEach(tm => {
                        if (ply.raiding_team_id == tm.team_id) awayRaids += tm.total_points;
                    });
                }
                Awaycount++;
            }
            if (Homecount >= 5 && Awaycount >= 5) break;
        }
    }
    return { homeRaids, awayRaids };
}
function Colours(dataToProcess){
	// Array of team names with corresponding colors
	const teamColors = [
	    { name: "AWADH", home: { color: '#FF7518', text: 'black' }, away: { color: '#FF7518', text: 'black' } },
	    { name: "MIRZAPUR", home: { color: '#00CDFE', text: 'black' }, away: { color: '#00CDFE', text: 'black' } },
	    { name: "LUCKNOW", home: { color: '#FF4AA4', text: 'white' }, away: { color: '#FF4AA4', text: 'white' } },
	    { name: "KASHI", home: { color: '#FFC000', text: 'black' }, away: { color: '#FFC000', text: 'black' } },
	    { name: "BRIJ", home: { color: '#38E038', text: 'black' }, away: { color: '#38E038', text: 'black' } },
	    { name: "YAMUNA", home: { color: '#FF3131', text: 'white' }, away: { color: '#FF3131', text: 'white' } },
	    { name: "SANGAM", home: { color: '#088F8F', text: 'white' }, away: { color: '#088F8F', text: 'white' } },
	    { name: "NOIDA", home: { color: '#1434A4', text: 'white' }, away: { color: '#1434A4', text: 'white' } }
	];
	
	// Loop through teamColors array
	teamColors.forEach(team => {
	    if (dataToProcess.api_Match.homeTeam.teamName1.includes(team.name)) {
	        homeColour = team.home.color;
	        homeTextColour = team.home.text;
	    }
	    if (dataToProcess.api_Match.awayTeam.teamName1.includes(team.name)) {
	        awayColour = team.away.color;
	        awayTextColour = team.away.text;
	    }
	});
}
function processMatchData(dataToProcess) {
    var HomeRaids = [], AwayRaids = [];
	var lastTackle = null;

    // Check if playByRaids exists and has elements before accessing its length
    if (dataToProcess.api_Match && dataToProcess.api_Match.play_by_play && dataToProcess.api_Match.play_by_play.playByRaids && dataToProcess.api_Match.play_by_play.playByRaids.length > 0) {
        lastTackle = dataToProcess.api_Match.play_by_play.playByRaids[dataToProcess.api_Match.play_by_play.playByRaids.length - 1];
    }    
    // Super Tackle logic
    if (lastTackle && lastTackle.team) {
        lastTackle.team.forEach(tm => {
            if (lastTackle.raiding_team_id == tm.team_id) {
                if (lastTackle.raiding_team_id == dataToProcess.homeTeam.teamApiId && dataToProcess.api_Match.awayTeamStats && dataToProcess.api_Match.awayTeamStats.no_of_players_on_court <= 3) {
                    document.getElementById('away_head').innerHTML = 'SUPER TACKLE ON ';
                } else if (lastTackle.raiding_team_id == dataToProcess.awayTeam.teamApiId && dataToProcess.api_Match.homeTeamStats && dataToProcess.api_Match.homeTeamStats.no_of_players_on_court <= 3) {
                    document.getElementById('home_head').innerHTML = 'SUPER TACKLE ON ';
                }
            }
        });
    }
    
    // Bonus On logic
    if (lastTackle && lastTackle.team) {
        lastTackle.team.forEach(tm => {
            if (lastTackle.raiding_team_id == tm.team_id) {
                if (lastTackle.raiding_team_id == dataToProcess.homeTeam.teamApiId && dataToProcess.api_Match.awayTeamStats && dataToProcess.api_Match.awayTeamStats.no_of_players_on_court >= 6) {
                    document.getElementById('home_head').innerHTML = 'BONUS ON ';
                } else if (lastTackle.raiding_team_id == dataToProcess.awayTeam.teamApiId && dataToProcess.api_Match.homeTeamStats && dataToProcess.api_Match.homeTeamStats.no_of_players_on_court >= 6) {
                    document.getElementById('away_head').innerHTML = 'BONUS ON ';
                }
            }
        });
    }
    
    // DO OR DIE RAID logic
    if (dataToProcess && dataToProcess.api_Match && dataToProcess.api_Match.play_by_play && dataToProcess.api_Match.play_by_play.playByRaids) {
        var raids = dataToProcess.api_Match.play_by_play.playByRaids;

        raids.forEach(ply => {
            if (dataToProcess.homeTeam && dataToProcess.homeTeam.teamApiId == ply.raiding_team_id && HomeRaids.length < 2) {
                HomeRaids.push(ply);
            }
            if (dataToProcess.awayTeam && dataToProcess.awayTeam.teamApiId == ply.raiding_team_id && AwayRaids.length < 2) {
                AwayRaids.push(ply);
            }
        });

        if (HomeRaids.length >= 2 &&
            HomeRaids[HomeRaids.length - 1].raid_outcome_id == 3 &&
            HomeRaids[HomeRaids.length - 2].raid_outcome_id == 3) {
            document.getElementById('home_head').innerHTML =  'DO OR DIE RAID';
        }

        if (AwayRaids.length >= 2 &&
            AwayRaids[AwayRaids.length - 1].raid_outcome_id == 3 &&
            AwayRaids[AwayRaids.length - 2].raid_outcome_id == 3) {
             document.getElementById('away_head').innerHTML = 'DO OR DIE RAID';
        }
    }
}
