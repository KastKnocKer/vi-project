package container.servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import container.GestioneContainer;

import utility.DBConnection;

/**
 * Servlet implementation class Container
 */
@WebServlet("/Container")
public class Container extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	private String Action = null;
	private int idOrdine = -1;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Container() {
        super();
    }

    
    /*
     * PER TESTARE USA IL LINK http://localhost:8080/VIProject/Container?idOrdine=1&action=GET
     */
    
    
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Action = request.getParameter("action");
		if(Action == null){	//se il parametro � nullo abortisco
			response.getWriter().println("Abort: Nessuna azione richiesta");
			return;
		}
		
		
		if(Action.equals("GET")){
			try{
				idOrdine = Integer.parseInt(request.getParameter("idOrdine"));
			}catch(Exception e){
				System.err.println("[Servlet Container] Errore di parsing dell'idOrdine");
			}
				
			response.getWriter().println(GestioneContainer.getContainerByID(idOrdine));
			return;
				
		}else if(Action.equals("Insert")){
				
		}else if(Action.equals("Insert")){
				
		}else if(Action.equals("Insert")){
				
		}
		else 
		
		
		
		response.getWriter().println( GestioneContainer.getAllContainers() );
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPut(HttpServletRequest, HttpServletResponse)
	 */
	protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doDelete(HttpServletRequest, HttpServletResponse)
	 */
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
