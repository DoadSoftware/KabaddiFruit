<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" name="viewport" content="width=device-width, initial-scale=1">
  <title>Fruit Screen</title>
  
  <script type="text/javascript" src="<c:url value="/webjars/jquery/3.6.0/jquery.min.js"/>"></script>
  <script type="text/javascript" src="<c:url value="/webjars/bootstrap/5.1.3/js/bootstrap.min.js"/>"></script>
  <script type="text/javascript" src="<c:url value="/resources/javascript/index.js"/>"></script>
 <link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/style.css"/>" />
  
  <link rel="stylesheet" href="<c:url value="/webjars/bootstrap/5.1.3/css/bootstrap.min.css"/>"/>  
  <link href="<c:url value="/webjars/font-awesome/6.0.0/css/all.css"/>" rel="stylesheet">
  
  <script type="text/javascript">
    setInterval(() => {
    	processKabaddiProcedures('READ-MATCH-THEN-CLOCK');
    }, 900);  
  </script>
</head>
<body onload="processKabaddiProcedures('LOAD_MATCH')">
  <div class="header-container">
    <img src="<c:url value='/resources/Images/Design.jpg'/>" alt="Logo">
    <h2>DESIGN ON A DIME</h2>
  </div>
  <div class="content py-8">
    <div class="container-fluid h-100">
      <div class="row text-nowrap h-100">
        <div class="col-lg d-flex flex-column">
          <div class="card-body flex-grow-1 d-flex flex-column">
            <div id="tables" class="table-container flex-grow-1"></div>
            <div id="tables2" class="table-container"></div>
            <div id="tables3" class="table-container"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <input type="hidden" name="select_broadcaster" id="select_broadcaster" value="${session_selected_broadcaster}"/>
  <input type="hidden" id="matchFileTimeStamp" name="matchFileTimeStamp" value="${session_match.matchFileTimeStamp}"/>
</body>
</html>
