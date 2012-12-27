package container;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
 
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

/**
 * Servlet implementation class ContainerFileUpload
 */
@WebServlet(name="FileUpload", urlPatterns="/module_container/ContainerFileUpload")
@MultipartConfig
public class ContainerFileUpload extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ContainerFileUpload() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Part filePart = request.getPart("nomeFile");
		//String nomeFile = getFilename(filePart);
		BufferedReader reader = new BufferedReader(new InputStreamReader(filePart.getInputStream()));
	    String line = null;
	    while ((line = reader.readLine()) != null)
	    	System.out.println(line);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Part filePart = request.getPart("file");
		String nomeFile = getFilename(filePart);
		BufferedReader reader = new BufferedReader(new InputStreamReader(filePart.getInputStream()));
	    String line = null;
	    
	    String file_name = nomeFile;
	    int lunghezza = file_name.length();

	    File newFile = new File(request.getParameter("Tipo")+" #"+request.getParameter("nrLotto")+" - cntr "+request.getParameter("nrContainer")+file_name.subSequence(lunghezza-4, lunghezza));
	    boolean exist = newFile.createNewFile();
	    //per debug
	    exist = true;
	    if (!exist){
		    System.out.println("File already exists. "+newFile.getAbsolutePath());
	    }else{
	    	boolean isFirst = true;
		    FileWriter fstream = new FileWriter(request.getParameter("Tipo")+" #"+request.getParameter("nrLotto")+" - cntr "+request.getParameter("nrContainer")+file_name.subSequence(lunghezza-4, lunghezza));
		    BufferedWriter out = new BufferedWriter(fstream);
		    while ((line = reader.readLine()) != null){
		    	System.out.println(line);
		    	if(!isFirst) out.newLine();
		    	out.write(line);
		    }
		    out.close();
		    System.out.println("File created successfully.");
	    }
	    
	    while ((line = reader.readLine()) != null){
	    	System.out.print(".");
	    }
	    	
	    
	    System.out.println("FINE YEEEEEEEE: "+nomeFile);
	    //response.getWriter().println("{\"success\": true,\"errors\": {\"field1\": \"requires\"}}");
	    
	    
	}

	
	private String length() {
		// TODO Auto-generated method stub
		return null;
	}

	private static String getFilename(Part part) {
		   for (String cd : part.getHeader("content-disposition").split(";")) {
		      if (cd.trim().startsWith("filename")) {
		         String filename = cd.substring(cd.indexOf('=') + 1).trim().replace("\"", "");
		         return filename.substring(filename.lastIndexOf('/') + 1).substring(filename.lastIndexOf('\\') + 1); // MSIE fix.
		      }
		   }
		 
		   return null;
	}
}
