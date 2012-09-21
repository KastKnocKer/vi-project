package utility;

import java.sql.*;

public class MySQLConnection{
	
	private String Host			= "localhost";
	private String nomeDB 		= "vip_db";     		// Nome del Database a cui connettersi
	private String nomeUtente	= "prog";   			// Nome utente utilizzato per la connessione al Database
	private String pwdUtente	= "prog";    			// Password usata per la connessione al Database
	private String nomeDriver	= "com.mysql.jdbc.Driver";	//Contiene il nome del driver JDBC
	private String errore		= "";       				// Raccoglie informazioni riguardo l'ultima eccezione sollevata
	
	private boolean connected = false;
	private Connection db;       // La connessione col Database
	
	public MySQLConnection(){
		
	}
	
	
	/**
	 * Apre la connessione con il Database
	 * @throws ClassNotFoundException 
	 * @throws IllegalAccessException 
	 */
	public boolean connect(){
		connected = false;
		try {
				Class.forName("com.mysql.jdbc.Driver").newInstance();
				db = DriverManager.getConnection("jdbc:mysql://"+Host+"/" + nomeDB + "?user=" + nomeUtente + "&password=" + pwdUtente);
				connected = true;
		} catch (SQLException ex) {
					// handle any errors
					System.out.println("SQLException: " + ex.getMessage());
					System.out.println("SQLState: " + ex.getSQLState());
					System.out.println("VendorError: " + ex.getErrorCode());
		} catch (InstantiationException ex){} catch (ClassNotFoundException ex){} catch (IllegalAccessException ex){}
			
		return connected;
	}
	
	
	/**
	 * Interrompe la connessione con il database
	 */
	public boolean disconnect(){
		try {
	         db.close();
	         connected = false;
	     } catch (Exception e) { e.printStackTrace(); }
		return true;
	}

}
