<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<script type="text/javascript" charset="utf-8" src="http://cdn.sencha.io/ext-4.1.0-gpl/ext-all.js"></script>
	<link rel="stylesheet" type="text/css" href="http://cdn.sencha.io/ext-4.1.0-gpl/resources/css/ext-all-gray.css" />
	<script type="text/javascript" src="js/login/login_main.js"></script>
	<script type="text/javascript" src="js/modular_base/modular_base_main.js"></script>
	<title>Vignola Import Project</title>
</head>
	
<body>
	<div id='div_centrale' align="center" style="margin:20px"></div>
	
	
		<%
		//Controllo sessione e login
			boolean loginStart = false;
			try{
				if( session == null || session.isNew() ){
					//la sessione è nulla, nuova o non valida
					loginStart = true;
					session.setAttribute("LOGGED", false);
					
				}else if( session.getAttribute("LOGGED").equals(false) ){
					//la sessione è valida ma l'utente non è autenticato
					loginStart = true;
					
				}else{
					//la sessione è valida e l'utente è correttamente autenticato
					loginStart = false;
					
				}
				}catch(Exception e){
					//In caso di eccezione si effettua il login
					loginStart = true;
					session.setAttribute("LOGGED", false);
				}
			
			//TODO togliere e terminare il login
			//loginStart = false;
			
			if(loginStart){
				//Carico la pagina di login
				%>
				<script type="text/javascript">
					/*Quando il documento è caricato eseguo l'applicazione*/
					Ext.EventManager.onDocumentReady(login_main);
				</script>
				<%
			}else{
				//Carico la pagina iniziale dell'applicazione (Base modulare)
				%>
				<script type="text/javascript">
					/*Quando il documento è caricato eseguo l'applicazione*/
					Ext.EventManager.onDocumentReady(modular_base_main);
				</script>
				START MY APP!
				<%
			}
		%>
		
	

</body>
	
	
</html>