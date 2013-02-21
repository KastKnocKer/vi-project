package utility;

public class DBConnection extends MySQLConnection{

	private static DBConnection staticDBConnection = null;
	
	public DBConnection(){
	}
	
	public static DBConnection getStaticDBConnection(){
		if(staticDBConnection == null){
			staticDBConnection = new DBConnection();
		}
		return staticDBConnection;
	}
}
