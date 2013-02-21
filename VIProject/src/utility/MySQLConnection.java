package utility;

import java.sql.*;

import org.json.JSONArray;
import org.json.JSONObject;

public class MySQLConnection{
	
	/*
	 	Host: sql2.freemysqlhosting.net
		Database name: sql23866
		Database user: sql23866
		Database password: aJ5*mL6*
	 */
	
	private String Host			= "sql2.freemysqlhosting.net";
	private String nomeDB 		= "sql23866";     		// Nome del Database a cui connettersi
	private String nomeUtente	= "sql23866";   			// Nome utente utilizzato per la connessione al Database
	private String pwdUtente	= "aJ5*mL6*";    			// Password usata per la connessione al Database
	private String nomeDriver	= "com.mysql.jdbc.Driver";	//Contiene il nome del driver JDBC
	private String errore		= "";       				// Raccoglie informazioni riguardo l'ultima eccezione sollevata
	
	private boolean connected = false;
	private Connection db;       // La connessione col Database
	
	public MySQLConnection(String Host, String nomeDB, String nomeUtente, String pwdUtente){
		this.Host = Host;
		this.nomeDB = nomeDB;
		this.nomeUtente = nomeUtente;
		this.pwdUtente = pwdUtente;
	}
	
	public MySQLConnection(){}
	
	
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
	 * Chiude la connessione con il database
	 */
	public boolean disconnect(){
		try {
	         db.close();
	         connected = false;
	     } catch (Exception e) { e.printStackTrace(); }
		return true;
	}
	
	public boolean idConnected(){
		return connected;
	}
	
	public PreparedStatement prepareStatement(String sql) throws SQLException{
		return db.prepareStatement(sql);
	}
	
	public JSONArray getJSONArrayFromResultSet(ResultSet result) throws SQLException{
		JSONObject tmp_json_obj;
		JSONArray json_array = new JSONArray();
		
		//result.next();
		
		ResultSetMetaData rsmd = result.getMetaData();
        int columnCount = rsmd.getColumnCount();
        int rowIndex = 0;
		
		
		while(result.next()) {//Carico i dati nella struttura che mi interessa
			tmp_json_obj = new JSONObject();

			for (int i=0; i<columnCount; i++) {
				try{
					//DEBUG System.err.println(rsmd.getColumnName(i+1)+" - "+result.getString(i+1));
					tmp_json_obj.put(rsmd.getColumnName(i+1), result.getString(i+1));
				}catch(Exception e){
					System.err.println("Errore traduzione in JSON OBJ");
				}
            }
			
			
			json_array.put(tmp_json_obj);	//Aggiungo il json object al json array
			
			rowIndex++;
		}
		if(json_array.isNull(0)) return null;
		return json_array;
	}
}
