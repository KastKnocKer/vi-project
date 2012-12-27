package container;

import javax.mail.MessagingException;
//import java.security.*;
//import com.sun.net.ssl.internal.ssl.*;


public class Provamail {

	public static void main(String[] args) {
		String emailFromAddress = "VIProject";
		String emailSubjectTxt = 	"invio file";
		String emailMsgTxt = 		"Grazie per avere scelto il nostro servizio!\n\n" +
									"Qui di seguito saranno forniti i documenti.\n\n" +
									"Mandaci i tuoi feedback per un servizio sempre migliore!";
		String[] sendTo = { "miriam.baraldi90@gmail.com"/*,"miryrocca@hotmail.it"*/};
		

		try {
			SendMail.sendSSLMessage(sendTo, emailSubjectTxt,emailMsgTxt, emailFromAddress);
		} catch (MessagingException e) {
			System.out.println("Exception");
			e.printStackTrace();
		}
		System.out.println("Sucessfully Sent mail to All Users");
		
		System.out.println("MAIL INVIATA");
	}

}
