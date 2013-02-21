package container;


import java.sql.*;

import org.json.JSONArray;
import org.json.JSONObject;

import utility.DBConnection;

public class GestioneContainer {
	
	public static JSONArray getAllContainers(){
		//Mi faccio restituire il riferimento alla connessione
		DBConnection db = new DBConnection();
		db.connect();
		ResultSet result;
		JSONObject tmp_json_obj;
		JSONArray json_array = null;
		try {
			PreparedStatement prepSt = (PreparedStatement) db.prepareStatement("SELECT * FROM container_ordine;");
			//prepSt.setString(1, rlm.getUsername());	//per inserire i parametri, ovvero sostituire i ? nella query string
			//prepSt.setString(2, rlm.getPassword());
			result = prepSt.executeQuery();
			//Utilizzo la funzione di utility per la creazione automatica dei jsonobject
			json_array = db.getJSONArrayFromResultSet(result);
		
			result.close();     // Chiudo il ResultSet
	        prepSt.close();   // Chiudo lo Statement
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		db.disconnect();		
		return json_array;
	}
	
	public static JSONArray getContainerByID(int id){
		DBConnection db = new DBConnection();
		db.connect();
		ResultSet result;
		JSONObject tmp_json_obj;
		JSONArray json_array = null;
		try {
			PreparedStatement prepSt = (PreparedStatement) db.prepareStatement("SELECT * FROM container_ordine WHERE idOrdine = ?;");
			prepSt.setInt(1, id);	//per inserire i parametri, ovvero sostituire i ? nella query string
			result = prepSt.executeQuery();
			//Utilizzo la funzione di utility per la creazione automatica dei jsonobject
			json_array = db.getJSONArrayFromResultSet(result);
		
			result.close();     // Chiudo il ResultSet
	        prepSt.close();   // Chiudo lo Statement
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		db.disconnect();		
		return json_array;
	}
	
	
	

}
