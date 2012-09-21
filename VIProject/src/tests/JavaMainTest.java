package tests;

import utility.DBConnection;

public class JavaMainTest {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		DBConnection db = new DBConnection();
		System.out.println("Connessione al db: "+db.connect());
	}

}
