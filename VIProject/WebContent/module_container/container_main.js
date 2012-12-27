window.ondragenter = function(e)
{
    e.dataTransfer.dropEffect = 'none';
    e.preventDefault();
    return false;
};

window.ondragover = function(e)
{
    e.preventDefault();
    return false;
};

window.ondrop = function(e)
{
    return false;
};

Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'Ext.ux': './ux',
        'Ext.ux.upload': './ux/upload'
    }
});

Ext.require(['Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.state.*',
        'Ext.ux.upload.Button',
        'Ext.ux.upload.plugin.Window']);


/**
 * Funzione main del modulo container: visualizza la pagina di accesso al modulo
 */

var container_main = function container_main(){
	
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [{
	        region: 'north',
	        html: '<h1 class="x-panel-header">Vignola Import Project - Modulo Container</h1>',
	        border: false,
	        margins: '0 0 5 0'
	    }, {
	        region: 'west',
	        collapsible: true,
	        title: 'Navigation',
	        width: 150
	        // could use a TreePanel or AccordionLayout for navigational items
	   // }, {
	   //     region: 'south',
	   //     title: 'South Panel',
	   //     collapsible: true,
	   //     html: 'Information goes here',
	   //     split: true,
	   //     height: 100,
	   //     minHeight: 100
	   // }, {
	   //     region: 'east',
	   //     title: 'East Panel',
	   //     collapsible: true,
	   //     split: true,
	   //     width: 150
	    }, {
	        region: 'center',
	        xtype: 'tabpanel', // TabPanel itself has no title
	        id: 'main_tabpanel',
	        activeTab: 0,      // First tab active by default
//	        items: [{
//	            title: 'Default Tab 0',
//	            html: 'The first tab\'s content. Others may be added dynamically'
//	        },{
//	            title: 'Default Tab 1',
//	            html: 'The first tab\'s content. Others may be added dynamically'
//	        }]
	    }]
	});
	
	
	// The data store containing the list of type of file
	var filetipe = Ext.create('Ext.data.Store', {
	    fields: ['num', 'name'],
	    data : [
	        {"num":"1", "name":"1- Frontespizio"},
	        {"num":"2", "name":"2- Conferma ordini fornitore"},
	        {"num":"3", "name":"3- Richiesta booking"},
	        {"num":"4", "name":"4- Conferma booking"},
	        {"num":"5", "name":"5- Etichette pallet"},
	        {"num":"6", "name":"6- Packing list fornitore – cliente"},
	        {"num":"7", "name":"7- Richiesta doc. carico container"},
	        {"num":"8", "name":"8- Lettera di vettura"},
	        {"num":"9", "name":"9- Agecontrol"},
	        {"num":"10", "name":"10- Fitosanitario-Coldtreatment"},
	        {"num":"11", "name":"11- Fumigazione"},
	        {"num":"12", "name":"12- Bolla fornitore"},
	        {"num":"13", "name":"13- Bolla cliente"},
	        {"num":"14", "name":"14- Fattura cliente"},
	        {"num":"15", "name":"15- Fattura fornitore"},
	        {"num":"16", "name":"16- DHL ricevuto"},
	        {"num":"17", "name":"17- Fornitore – acconto 50%"},
	        {"num":"18", "name":"18- Bill of loading"},
	        {"num":"19", "name":"19- Fattuar di acconto"},
	        {"num":"20", "name":"20- Documenti ricevuti per posta dal fornitore"},
	        {"num":"21", "name":"21- Cliente – acconto 50%"}
	        
	    ]
	});
	
	var form_da_aggiungere = Ext.create('Ext.form.Panel', {
	    title: 'FORM',
	    width: 400,
	    bodyPadding: 10,
        headers: {'Content-type':'multipart/form-data'},
	    frame: true,
	   // anchor: '100% -51',
	    items: [{
	        xtype: 'textfield',
	        fieldLabel: 'Fornitore',
	        id: 'Fornitore',
            width: 250,
            y:60,
            x:50,
            allowBlank: false,
	        name: 'nrFornitore'
	    },
	    {
	    	xtype: 'textfield',
	        fieldLabel: 'Destinatario',
	        id: 'Destinatario',
            width: 250,
            y:85,
            x:50,
            allowBlank: false,
	        name: 'nrDestinatario'
	    }, {
	        xtype: 'textfield',
	        fieldLabel: 'Num Lotto',
	        id: 'Lotto1',
	        allowBlank: false,
	        width: 250,
	        y:110,
	        x:50,
	        name: 'nrLotto1'
        }, {
	    	xtype: 'numberfield',
	        fieldLabel: 'Riferimento Booking',
	        id: 'Rif_Booking',
            y:130,
            x:50,
            allowBlank: true,
	        name: 'rifBooking'
        }, {
	    	xtype: 'textfield',
	        fieldLabel: 'Nome Nave',
	        id: 'Nome_Nave',
            width: 250,
            y:160,
            x:50,
            allowBlank: true,
	        name: 'NomeNave'
        }, {
	    	xtype: 'datefield',
	        fieldLabel: 'Data carico a magazzino',
	        id: 'Data_Carico_Magazzino',
            y:180,
            x:50,
            allowBlank: true,
	        name: 'DataCaricoMagazzino'
        }, {
	    	xtype: 'textfield',
	        fieldLabel: 'Porto imbarco',
	        id: 'Porto_Imbarco',
            width: 250,
            y:210,
            x:50,
            allowBlank: true,
	        name: 'PortoImbarco'
        }, {
	    	xtype: 'datefield',
	        fieldLabel: 'Data imbarco',
	        id: 'Data_Imbarco',
            y:235,
            x:50,	        
            allowBlank: true,
	        name: 'DataImbarco'
        }, {
	    	xtype: 'textfield',
	        fieldLabel: 'Porto arrivo',
	        id: 'Porto_Arrivo',
            width: 250,
            y:260,
            x:50,
            allowBlank: true,
	        name: 'PortoArrivo'
        }, {
	    	xtype: 'datefield',
	        fieldLabel: 'Data arrivo',
	        id: 'Data_Arrivo',
            y:285,
            x:50,
            allowBlank: true,
	        name: 'DataArrivo'
        }, {
	    	xtype: 'textfield',
	        fieldLabel: 'Num Container',
	        id: 'Container1',
            width: 250,
            y:310,
            x:50,
            allowBlank: true,
	        name: 'nrContainer1'
        }, {
	    	xtype: 'textfield',
	        fieldLabel: 'SIGILLO',
	        id: 'Sigillo',
            width: 250,
            y:335,
            x:50,
            allowBlank: true,
	        name: 'Sigillo'
        }, {
	    	xtype: 'textfield',
	        fieldLabel: 'NR. RYAN 1',
	        id: 'Ryan_Uno',
            width: 250,
            y:360,
            x:50,
            allowBlank: true,
	        name: 'RyanUno'
        }, {
	    	xtype: 'textfield',
	        fieldLabel: 'NR. RYAN 2',
	        id: 'Ryan_Due',
            width: 250,
            y:385,
            x:50,
            allowBlank: true,
	        name: 'RyanDue'
        }, {
	    	xtype: 'datefield',
	        fieldLabel: 'Posta Ricevuta il',
	        id: 'Data_Ricez_Posta',
            y:410,
            x:50,
            allowBlank: true,
	        name: 'DataRicezPosta'
        }, {
	    	xtype: 'datefield',
	        fieldLabel: 'Posta Inviata il',
	        id: 'Data_Invio_Posta',
            y:435,
            x:50,
            allowBlank: true,
	        name: 'DataInvioPosta'
        }, {
	    	xtype: 'textarea',
	        fieldLabel: 'Annotazioni',
	        id: 'Annotazioni',
            width: 250,
            y:460,
            x:50,
            allowBlank: true,
	        name: 'Annotazioni'
        }, {
	    	xtype: 'numberfield',
	        fieldLabel: 'BOLLA n.',
	        id: 'BollaCliente',
            width: 180,
            y:85,
            x:350,
            allowBlank: true,
	        name: 'BollaCliente'
        }, {
	    	xtype: 'datefield',
	        fieldLabel: 'Data',
	        id: 'BollaClienteData',
            width: 200,
            y:85,
            x:550,
            allowBlank: true,
	        name: 'BollaClienteData'
        }, {
	    	xtype: 'numberfield',
	        fieldLabel: 'FATTURA n.',
	        id: 'FatturaCliente',
            width: 180,
            y:110,
            x:350,
            allowBlank: true,
	        name: 'FatturaCliente'
        }, {
	    	xtype: 'datefield',
	        fieldLabel: 'Data',
	        id: 'FatturaClienteData',
            width: 200,
            y:110,
            x:550,
            allowBlank: true,
	        name: 'FatturaClienteData'
        }, {
	    	xtype: 'numberfield',
	        fieldLabel: 'BOLLA n.',
	        id: 'BollaFornitore',
            width: 180,
            y:170,
            x:350,
            allowBlank: true,
	        name: 'BollaFornitore'
        }, {
	    	xtype: 'datefield',
	        fieldLabel: 'Data',
	        id: 'BollaFornitoreData',
            width: 200,
            y:170,
            x:550,
            allowBlank: true,
	        name: 'BollaFornitoreData'
        }, {
	    	xtype: 'numberfield',
	        fieldLabel: 'FATTURA n.',
	        id: 'FatturaFornitore',
            width: 180,
            y:195,
            x:350,
            allowBlank: true,
	        name: 'FatturaFornitore'
        }, {
	    	xtype: 'datefield',
	        fieldLabel: 'Data',
	        id: 'FatturaFornitoreData',
            width: 200,
            y:195,
            x:550,
            allowBlank: true,
	        name: 'FatturaFornitoreData'
        },{
	        	  xtype: 'box',
	        	  autoEl: {cn: 'Cliente'},
	        	  id: 'cliente',
	              width: 200,
	              y:65,
	              x:350,
        },{
      	  xtype: 'box',
      	  autoEl: {cn: 'Fornitore'},
      	  id: 'fornitore',
            width: 200,
            y:150,
            x:350, 	
	              	
	    }],

	    
	});




	var form_secondo = Ext.create('Ext.form.Panel', {
	    title: 'Finestra principale',
	    width: 300,
	    height: 150,
	    bodyPadding: 10,
        headers: {'Content-type':'multipart/form-data'},
	    frame: true,
	    layout: 'absolute',

	    //TODO: settare posizione bottoni
	    items:[{
            xtype:'panel',
            y:0,
            x:0,
            width: 1000,
            height: 600,
            items:[
            {
                xtype:'button',
    	        text: 'NUOVO ORDINE',
    	        id: 'Nuovo_Ordine',
                y:50,
                x:50,
                width:200,
                height: 200,
    	        listeners: {
    	            click: function(){
    	            	form_secondo.add('Fornitore');
    	            	form_secondo.add('Destinatario');
    	            	form_secondo.add('Lotto1');
    	            	form_secondo.add('Rif_Booking');
    	            	form_secondo.add('Nome_Nave');
    	            	form_secondo.add('Data_Carico_Magazzino');
    	            	form_secondo.add('Porto_Imbarco');
    	            	form_secondo.add('Data_Imbarco');
    	            	form_secondo.add('Porto_Arrivo');
    	            	form_secondo.add('Data_Arrivo');
    	            	form_secondo.add('Container1');
    	            	form_secondo.add('Sigillo');
    	            	form_secondo.add('Ryan_Uno');
    	            	form_secondo.add('Ryan_Due');
    	            	form_secondo.add('Data_Ricez_Posta');
    	            	form_secondo.add('Data_Invio_Posta');
    	            	form_secondo.add('Annotazioni');
    	            	form_secondo.add('BollaCliente');
    	    			form_secondo.add('BollaClienteData');
    	            	form_secondo.add('FatturaCliente');
    	    			form_secondo.add('FatturaClienteData');
    	            	form_secondo.add('BollaFornitore');
    	    			form_secondo.add('BollaFornitoreData');
    	            	form_secondo.add('FatturaFornitore');
    	    			form_secondo.add('FatturaFornitoreData');
    	    			form_secondo.add('cliente');
    	    			form_secondo.add('fornitore');

    	    			
    	    			form_secondo.add('grid');

    	            	Ext.getCmp('Nuovo_Ordine').hide();
    	            	Ext.getCmp('Modifica_Ordine').hide();

    	            }
    	        }
            },{
                xtype:'button',
    	        text: 'MODIFICA ORDINE',
    	        id: 'Modifica_Ordine',
                y:50,
                x:75,
                width:200,
                height: 200,
            }]
        }]
	});
	  
	
	var Prodotto = Ext.create('Ext.data.Store', {
	    fields: ['prodotto'],
	    data : [
	        {"prodotto":"prod1"},
	        {"prodotto":"prod2"},
	        {"prodotto":"prod3"},
	        {"prodotto":"prod4"}
	    ]
	});

//	var Calibro = Ext.create('Ext.data.Store', {
//	    fields: ['calibro'],
//	    data : [
//	        {"calibro":"1"},
//	        {"calibro":"2"},
//	        {"calibro":"3"},
//	        {"calibro":"4"}
//	    ]
//	});
//
//	var Pedane = Ext.create('Ext.data.Store', {
//	    fields: ['pedane'],
//	    data : [
//	        {"pedane":"11"},
//	        {"pedane":"22"},
//	        {"pedane":"33"},
//	        {"pedane":"44"}
//	    ]
//	});
	
	var store = Ext.create('Ext.data.Store', {
	    storeId : 'store_prova',
	    fields  : ['name', 'email', 'change'],
	    data    : {'items' : [
	        { 'prodotto' : 'prod1',  'calibro' : '1',  'pedane' : 11  },
	        { 'prodotto' : 'prod2',  'calibro' : '2',  'pedane' : 22  },
	        { 'prodotto' : 'prod3', 'calibro' : '3',  'pedane' : 33  },
	        { 'prodotto' : 'prod4', 'calibro' : '4', 'pedane' : 44  }
	    ]},
	    proxy   : {
	        type   : 'memory',
	        reader : {
	            type : 'json',
	            root : 'items'
	        }
	    }
	});
	
	var editor = {
	    xtype: 'textfield',
	    allowBlank: false
	};

	Ext.define('MyComboField1',{
	    extend:'Ext.form.ComboBox',
	    alias: 'widget.customCombo1',
	    store: Prodotto,
	    queryMode: 'local',
	    displayField: 'prodotto',
	    valueField: 'prodotto'
	});
	
	Ext.define('MyComboField2',{
	    extend:'Ext.form.ComboBox',
	    alias: 'widget.customCombo2',
	    //store: Calibro,
	    queryMode: 'local',
	    displayField: 'calibro',
	    valueField: 'calibro',
	});
	
	Ext.define('MyComboField3',{
	    extend:'Ext.form.ComboBox',
	    alias: 'widget.customCombo3',
	    //store: Pedane,
	    queryMode: 'local',
	    displayField: 'pedane',
	    valueField: 'pedane'
	});
	
	Ext.define('MyComboField4',{
	    extend:'Ext.form.ComboBox',
	    alias: 'widget.customCombo4',
	    queryMode: 'local',
	    displayField: 'colli',
	    valueField: 'colli'
	});
	
	Ext.define('MyComboField5',{
	    extend:'Ext.form.ComboBox',
	    alias: 'widget.customCombo5',
	    queryMode: 'local',
	    displayField: 'pesolordo',
	    valueField: 'pesolordo'
	});
	
	Ext.define('MyComboField6',{
	    extend:'Ext.form.ComboBox',
	    alias: 'widget.customCombo6',
	    queryMode: 'local',
	    displayField: 'pesonetto',
	    valueField: 'pesonetto'
	});
	
	Ext.define('MyComboField7',{
	    extend:'Ext.form.ComboBox',
	    alias: 'widget.customCombo7',
	    queryMode: 'local',
	    displayField: 'euroalkg',
	    valueField: 'euroalkg'
	});
	
	Ext.define('MyComboField8',{
	    extend:'Ext.form.ComboBox',
	    alias: 'widget.customCombo8',
	    queryMode: 'local',
	    displayField: 'dollarialpezzo',
	    valueField: 'dollarialpezzo'
	});

	var cellEditing = Ext.create('Ext.grid.plugin.CellEditing',{
	    clicksToEdit:1
	});

	Ext.create('Ext.grid.Panel', {
	    title      : 'Grid',
	    id: 'grid',
        width: 600,
        y:250,
        x:350,
	    store      : Ext.data.StoreManager.lookup('store_prova'),
	    selModel:{
	        selType:'cellmodel'
	    },    
	    columns    : [
	        { 
	          header: 'Prodotto',  
	          dataIndex: 'prodotto', 
	          editor: {xtype: 'customCombo1'},
	          sortable: true,
	          field: {xtype: 'textfield'},
              width: 100,
			},{
			  header: 'Calibro', 
	          dataIndex: 'calibro', 
	          flex: 1, 
	          editor: {xtype: 'customCombo2'},
	          sortable: false,
              width: 50,
	          field: {xtype: 'numberfield',	 minValue: 100, maxValue: 200},
	        },{
	          header: '#Ped', 
	          dataIndex: 'pedane', 
	          editor: {xtype: 'customCombo3'},
	          sortable: false,
	          field: {xtype: 'numberfield'},
              width: 45,
	        },{
		       header: '#Colli', 
		       dataIndex: 'colli', 
		       editor: {xtype: 'customCombo4'},
		       sortable: false,
		       field: {xtype: 'numberfield'},
	           width: 45,
	        },{
		       header: 'Peso Lordo', 
		       dataIndex: 'pesolordo', 
		       editor: {xtype: 'customCombo5'},
		       sortable: false,
		       field: {xtype: 'numberfield'},
	           width: 70
	        },{
		       header: 'Peso Netto', 
		       dataIndex: 'pesonetto', 
		       editor: {xtype: 'customCombo6'},
		       sortable: false,
		       field: {xtype: 'numberfield'},
	           width: 70
	        },{
			    header: 'Euro/Kg', 
			    dataIndex: 'euroalkg',
		        width: 55,
			    editor: {xtype: 'customCombo7'},
			    sortable: false,
			    field: {xtype: 'numberfield'},
	        },{
			    header: 'SubTot', 
			    dataIndex: 'subtot1', 
	            //summaryType: 'sum',
			    sortable: false,
	            renderer: function(value, metaData, record, rowIndex, colIndex, store) {
	                return record.get('pesonetto') * record.get('euroalkg');
	            },
	            field: {
	                xtype: 'numberfield'
	            },
	            editable: false,
		        width: 55
	        },{
			    header: '$/pz', 
			    dataIndex: 'dollarialpezzo',
		        width: 55,
			    editor: {xtype: 'customCombo8'},
			    sortable: false,
			    field: {xtype: 'numberfield'},
	        },{
			    header: 'SubTot', 
			    dataIndex: 'subtot2', 
	            //summaryType: 'sum',
			    sortable: false,
	            renderer: function(value, metaData, record, rowIndex, colIndex, store) {
	                return record.get('pesonetto') * record.get('euroalkg');
	            },
	            field: {
	                xtype: 'numberfield'
	            },
	            editable: false,
		        width: 55
}
	    ],
	    tbar       : [{
	        text   : 'Add Record',
	        handler: function(){
	            store.insert(0,{name: 'Sencha', email: 'support@sencha.com', change: 1000});
	            cellEditing.startEditByPosition({row:0,column:0});
	        }
	    }],
	    plugins: [ cellEditing ],
	    //renderTo : Ext.getBody()
	});
	
	
	//TODO: aggiungere drag e drop
	var prova_form_upload = Ext.create('Ext.form.Panel', {
	    title: 'Upload a File',
	    width: 400,
	    bodyPadding: 10,
        headers: {'Content-type':'multipart/form-data'},
	    frame: true,
	  
	    items: [{
	        xtype: 'filefield',
	        name: 'file',
	        fieldLabel: 'File',
	        labelWidth: 50,
	        msgTarget: 'side',
	        allowBlank: false,
	        anchor: '100%',
	        buttonText: 'Select file...'
	    }, {
        xtype: 'textfield',
        fieldLabel: 'Num Lotto',
        id: 'Lotto',
        allowBlank: false,
        //width: 250,
        //y:110,
        //x:50,
        name: 'nrLotto'
	    }, {
	    	xtype: 'textfield',
	        fieldLabel: 'Num Container',
	        id: 'Container',
            //width: 250,
            //y:310,
            //x:50,
            allowBlank: true,
	        name: 'nrContainer'
        }, {
            xtype: 'combo',
            id: 'Tipo',
            fieldLabel: 'Tipo di file',
            emptyText: 'Seleziona il tipo',
            name: 'Tipo',
            queryMode: 'local',
            displayField: 'name',
            valueField: 'name',
            //hiddenName:'cTypeID',
            //hiddenValue:0,
            store: filetipe
	    }],

	    buttons: [{
	        text: 'Upload',
	        handler: function() {
	            var form = this.up('form').getForm();
	            if(form.isValid()){
	                form.submit({
	                    url: 'ContainerFileUpload',
	                    waitMsg: 'Uploading your file...',
	                    success: function(fp, o) {
	                        Ext.Msg.alert('Success', 'Your file "' + o.result.file + '" has been uploaded.');
	                    }
	                
	                });
	            }
	        }
	    }]
	});

	var myTabPanel = Ext.getCmp('main_tabpanel');
	myTabPanel.add(form_secondo);
	myTabPanel.add(prova_form_upload);

	//myTabPanel.add(prova_drag_button);
}