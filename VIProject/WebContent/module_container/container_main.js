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
	Ext.define('DettaglioListaContainer', {
	    extend: 'Ext.data.Model',
	    fields: [
	        {name: 'idOrdine',     type: 'string'},
	        {name: 'numLotto',      type: 'string'}
	    ],
	    proxy: {
	        type: 'rest',
	        url : '/VIProject/Container?action=GETCONTAINERLIST',
	        reader: {
		        type: 'json',
		        model: 'DettaglioListaContainer',
		        idProperty: 'idOrdine',
		        root: 'container'	//INDICA LA SOTTOSEZIONE DELL'ALBERO JSON
		    }
	    }
	});
	
	Ext.create('Ext.data.Store', {
		storeId: 'datastore_lista_container',
		model: 'DettaglioListaContainer',
		autoLoad: true,
		//autoSync: true,
		//pageSize: 50
	});
	
	
	
	
//	
//	//DEFINIZIONE MODELLO
//	Ext.define('DettaglioListaContainer', {
//	  extend: 'Ext.data.Model',
//	  fields: [
//	           {name: 'idOrdine', 		type: 'int'},
//	           {name: 'numLotto', 		type: 'string'}
//	  ],
//	  proxy: {
//	      type: 'rest',
//	      url : 'Container',
//	      appendId: true,
//	      api: {
//	          create: 	'Container',
//	          read: 		'Container?action=GETCONTAINERLIST',
//	          update: 	'Container',
//	          destroy: 	'Container',
//	      },
//	      writer: {
//	          type: 'singlepost'
//	      },
//			reader: {
//		        type: 'json',
//		        model: 'DettaglioListaContainer',
//		        idProperty: 'idOrdine',
//		        root: 'love'
//		    }
//	  }
//	});
//	
	
	
	
	
	
	
	
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
	
	var fornitore = Ext.create('Ext.data.Store', {
	    fields: ['id','fornitore'],
	    data : [
	        {"id":"01", "fornitore":"01 - DAGA"},
	        {"id":"02", "fornitore":"02 - SOLFRUTTA"},
	        {"id":"03", "fornitore":"03 - PATTINI"},
	        {"id":"04", "fornitore":"04 - FRUTTAC2"},
	        {"id":"05", "fornitore":"05 - OLIVERO"},
	        {"id":"06", "fornitore":"06 - VOG"},
	        {"id":"07", "fornitore":"07 - GASTALDELLI"},
	        {"id":"08", "fornitore":"08 - CURMAC"},	        
	    ]
	});
	
	var destinatario = Ext.create('Ext.data.Store', {
	    fields: ['id','destinatario'],
	    data : [
	        {"id":"CI", "destinatario":"CI - Fresh International"},
	        {"id":"EE", "destinatario":"EE - Tomlange Company"},
	        {"id":"VI", "destinatario":"VI - Bar Imex"},
	        {"id":"AZ", "destinatario":"AZ - DNE"},

	    ]
	});
	
	var prodotto = Ext.create('Ext.data.Store', {
	    fields: ['id','prodotto'],
	    data : [
	        {"id":"KW", "prodotto":"KW - Kiwi"},
	        {"id":"RG", "prodotto":"RG - Mele Royal Gala"},
	        {"id":"AF", "prodotto":"AF - Pere Abate Fetel"},
	        {"id":"PA", "prodotto":"PA - Prugne Angeleno"},

	    ]
	});
	
	var campagna = Ext.create('Ext.data.Store', {
	    fields: ['id','campagna'],
	    data : [
	        {"id":"10", "campagna":"10/11"},
	        {"id":"11", "campagna":"11/12"},
	        {"id":"12", "campagna":"12/13"},
	        {"id":"13", "campagna":"13/14"},
	        {"id":"14", "campagna":"14/15"},
	        {"id":"15", "campagna":"15/16"},

	    ]
	});
	
//	var ordini = Ext.create('Ext.data.Store', {
//	    fields: ['lotto'],
//	    data : [
//	        {"lotto":"LOTTO1"},
//	        {"lotto":"LOTTO2"},
//	        {"lotto":"LOTTO3"},
//	        {"lotto":"LOTTO4"},
//	        {"lotto":"LOTTO5"},
//	    ]
//	});
	var form_da_aggiungere = Ext.create('Ext.form.Panel', {
	    title: 'FORM',
	    width: 400,
	    bodyPadding: 10,
        headers: {'Content-type':'multipart/form-data'},
	    frame: true,
	   // anchor: '100% -51',
	    items: [{
            xtype: 'combo',
            width: 250,
            y:60,
            x:50,
            id: 'Fornitore',
            fieldLabel: 'Fornitore',
            allowBlank: false,
            queryMode: 'local',
            displayField: 'fornitore',
            valueField: 'id',
            store: fornitore
	    },{
	    	xtype: 'combo',
	        fieldLabel: 'Destinatario',
	        id: 'Destinatario',
            width: 250,
            y:85,
            x:50,
            allowBlank: false,
            displayField: 'destinatario',
            valueField: 'id',
            store: destinatario
	    },{
	    	xtype: 'combo',
	        fieldLabel: 'Prodotto',
	        id: 'Prodotto',
            width: 200,
 	        y:60,
	        x:320,
            allowBlank: false,
            displayField: 'prodotto',
            valueField: 'id',
            store: prodotto
	    },{
	    	xtype: 'combo',
	        fieldLabel: 'Campagna',
	        id: 'Campagna',
            width: 200,
 	        y:85,
	        x:320,
            allowBlank: false,
            displayField: 'campagna',
            valueField: 'id',
            store: campagna
	    }, {
	        xtype: 'textfield',
	        fieldLabel: 'Num Lotto',
	        id: 'Lotto1',
	        allowBlank: false,
	        listeners: {
	            render: function() {
	                this.getEl().on('mousedown', function(e, t, eOpts) {Ext.getCmp('Lotto1').setValue((Ext.getCmp('Destinatario').getValue()+Ext.getCmp('Fornitore').getValue()
	                													+Ext.getCmp('Prodotto').getValue()+Ext.getCmp('Campagna').getValue()))}); 
	            }
	        },
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
            x:550,
            allowBlank: true,
	        name: 'BollaCliente'
        }, {
	    	xtype: 'datefield',
	        fieldLabel: 'Data',
	        id: 'BollaClienteData',
            width: 200,
            y:85,
            x:750,
            allowBlank: true,
	        name: 'BollaClienteData'
        }, {
	    	xtype: 'numberfield',
	        fieldLabel: 'FATTURA n.',
	        id: 'FatturaCliente',
            width: 180,
            y:110,
            x:550,
            allowBlank: true,
	        name: 'FatturaCliente'
        }, {
	    	xtype: 'datefield',
	        fieldLabel: 'Data',
	        id: 'FatturaClienteData',
            width: 200,
            y:110,
            x:750,
            allowBlank: true,
	        name: 'FatturaClienteData'
        }, {
	    	xtype: 'numberfield',
	        fieldLabel: 'BOLLA n.',
	        id: 'BollaFornitore',
            width: 180,
            y:170,
            x:550,
            allowBlank: true,
	        name: 'BollaFornitore'
        }, {
	    	xtype: 'datefield',
	        fieldLabel: 'Data',
	        id: 'BollaFornitoreData',
            width: 200,
            y:170,
            x:750,
            allowBlank: true,
	        name: 'BollaFornitoreData'
        }, {
	    	xtype: 'numberfield',
	        fieldLabel: 'FATTURA n.',
	        id: 'FatturaFornitore',
            width: 180,
            y:195,
            x:550,
            allowBlank: true,
	        name: 'FatturaFornitore'
        }, {
	    	xtype: 'datefield',
	        fieldLabel: 'Data',
	        id: 'FatturaFornitoreData',
            width: 200,
            y:195,
            x:750,
            allowBlank: true,
	        name: 'FatturaFornitoreData'
        },{
	       xtype: 'box',
	       autoEl: {cn: 'Cliente'},
	       id: 'cliente',
	       width: 200,
	       y:65,
	       x:550,
        },{
      	  xtype: 'box',
      	  autoEl: {cn: 'Fornitore'},
      	  id: 'fornitore',
          width: 200,
          y:150,
          x:550,
        },{
              xtype:'button',
  	        text: 'Invia',
  	        id: 'Invia_Dati',
  	        y:550,
  	        x:850,
  	        width: 100,
  	        height: 50,
  	        listeners: {
  	            click: function(){
  	              var form = this.up('form').getForm();
  	            if(form.isValid()){
  	                form.submit({
  	                    url: '/VIProject/Container',
  	                    waitMsg: 'Uploading your file...',
  	                    success: function(fp, o) {
  	                        Ext.Msg.alert('Success', 'Your file "' + o.result.file + '" has been uploaded.');
  	                    }
  	                
  	                });
  	            }
  	         }
          }

	              	
	    }],
	   
 
	});


//	//setto il valore del Lotto automaticamente
//	var forn = Ext.getCmp('Fornitore');
//	var dest = Ext.getCmp('Destinatario');
//
//	
//	var prova = (forn.getValue() + dest.getValue() );
//
//	form_da_aggiungere.getComponent('Lotto1').setValue(prova);

	   Ext.define('DatiTabella', {
	       extend: 'Ext.data.Model',
	       fields: [
	                {name: 'idOrdine', type: 'string'},
	                {name: 'nrLotto', type: 'string'},
	                ],
	                proxy: {
	                    type: 'ajax',
	                    url : 'VIProject/Container',
	            		reader: {
	            	        type: 'json',
	            	        root: 'container',
	                        getResponseData: function(response) {
	                            var data = Ext.data.reader.Json.prototype.getResponseData.call(this, response);

	                            if (data && Ext.isArray(data.data)) {
	                                data.data = Ext.Array.map(data.data, function(val) {
	                                    return {emailDir: val};
	                                });
	                            }

	                            return data;
	                        }
	            	    }
	                }


	   });

//	      var ordini = Ext.create('Ext.data.Store', {
//	         // pageSize: 10,
//	  		storeId: 'dati_tabella',
//	        model: 'DatiTabella',
//			autoLoad: true,
//	      });
	

//	var store = new Ext.data.JsonStore ({
//		url:'/Container', 
//		fields:[ 'idOrdine','nrLotto' ] 
//	}); 
//	store.load();
	   
//	   Ext.define('MyModel', {
//		    extend: 'Ext.data.Model',
//	           proxy: {
//	               type: 'ajax',
//	               url: '/VIProject/Container',
//	               reader: {
//	                   type: 'json',
//	                   root: 'container'
//	             }
//	          },
//		    fields: ['idOrdine', 'numLotto']
//		});
//	   
//	   var store = Ext.create('Ext.data.Store',{
//	       model: MyModel,
//           autoLoad: true,	   
//	   });
//	   
       
//	    var proxy=new Ext.data.HttpProxy({url:'/VIProject/Container'});
//
//	    var reader=new Ext.data.JsonReader({},[
//	          {name: 'idOrdine', mapping: 'idOrdine'},
//	          {name: 'numLotto', mapping: 'numLotto'}
//	     ]);
//	   
//	     var store=new Ext.data.Store(    {
//	         proxy:proxy,
//	         reader:reader
//	     });
//
//	    store.load();

    var listView = Ext.create('Ext.grid.Panel', {
        width:425,
        height:250,
        id: 'lista',
        collapsible:true,
        title:'Simple ListView <i>(0 items selected)</i>',
//        renderTo: Ext.getBody(),
        store: Ext.getStore('datastore_lista_container'),
        multiSelect: true,
        viewConfig: {
            emptyText: 'No images to display'
        },

        columns: [{
            text: 'idOrdine',
            flex: 15,
            sortable: true,
            dataIndex: 'idOrdine'
        },{
            text: 'Lotto',
            flex: 20,
            sortable: true,
            dataIndex: 'numLotto'
        }]
    });

    // little bit of feedback
    listView.on('selectionchange', function(view, nodes){
        var l = nodes.length;
        var s = l != 1 ? 's' : '';
        listView.setTitle('Simple ListView <i>('+l+' item'+s+' selected)</i>');
    });

//	new Ext.Button({
//	    text: "Carica dati lista",
//	    id: 'carica',
//        y:300,
//        x:200,
//        width:100,
//        height: 50,
//	    handler: function () {
//	    }
//	});
    

	
	var form_secondo = Ext.create('Ext.form.Panel', {
	    title: 'Finestra principale',
	    width: 300,
	    height: 150,
	    bodyPadding: 10,
        headers: {'Content-type':'multipart/form-data'},
	    frame: true,
	    layout: 'absolute',

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
    	            	form_secondo.add('Prodotto');
    	            	form_secondo.add('Campagna');
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
    	    			form_secondo.add('Invia_Dati');
    	    			
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
                listeners: {
    	            click: function(){
    	            	Ext.getCmp('Nuovo_Ordine').hide();
    	            	Ext.getCmp('Modifica_Ordine').hide();

//    	    	        Ext.Ajax.request({
//    	                    url: '/VIProject/Container',
//
//    	    	            success: function (action){alert('Lista caricata!'); console.debug(action); },
//    	    	            failure: function (){alert('Errore nel caricamento...');},
//    	    	            headers: {
//    	    	                'my-header': 'foo'
//    	    	            },
//    	    	            params: { action: "GETCONTAINERLIST" }
//    	    	        });
    	    	        
    	            	form_secondo.add('lista');
    	            	//form_secondo.add('carica');

    	            	
    	            }
    	        }

            }]
        }]
	});
	  

	
	var store = Ext.create('Ext.data.Store', {
	    storeId : 'store_prova',
	    fields  : ['name', 'email', 'change'],
	    data    : {'items' : [
	        {  },
	        {  },
	        {  },
	        {  },
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
	          sortable: true,
	            field: {
	                xtype: 'combobox',
	                typeAhead: true,
	                triggerAction: 'all',
	                selectOnTab: true,
	                store: [
	                    ['Kiwi','Kiwi'],
	                    ['Mele Royal Gala','Mele Royal Gala'],
	                    ['Pere Abate Fetel','Pere Abate Fetel'],
	                    ['Prugne Angeleno','Prugne Angeleno']
	                ],
	                lazyRender: true,
	                listClass: 'x-combo-list-small'
	            },
	            width: 100,
              
			},{
			  header: 'Calibro', 
	          dataIndex: 'calibro', 
	          flex: 1, 
	          sortable: true,
              width: 50,
	            field: {
	                xtype: 'combobox',
	                typeAhead: true,
	                triggerAction: 'all',
	                selectOnTab: true,
	                store: [
	                    ['25','25'],
	                    ['26','26'],
	                    ['30','30'],
	                    ['100','100'],
	                    ['101','101'],
	                    ['105','105'],
	                    ['105','105'],
	                ],
	                lazyRender: true,
	                listClass: 'x-combo-list-small'
	            },	        },{
	          header: '#Ped', 
	          dataIndex: 'pedane', 
	          sortable: false,
	            field: {
	                xtype: 'numberfield',
	            },              
	            width: 45,
	        },{
		       header: '#Colli', 
		       dataIndex: 'colli', 
		       sortable: false,
	            field: {
	                xtype: 'numberfield',
	            },        
	            width: 45,
	        },{
		       header: 'Peso Lordo', 
		       dataIndex: 'pesolordo', 
		       sortable: false,
	            field: {
	                xtype: 'numberfield',
	            },  
	            width: 70
	        },{
		       header: 'Peso Netto', 
		       dataIndex: 'pesonetto', 
		       sortable: false,
	            field: {
	                xtype: 'numberfield',
	            },           
	            width: 70
	        },{
			    header: 'Euro/Kg', 
			    dataIndex: 'euroalkg',
		        width: 55,
			    sortable: false,
	            field: {
	                xtype: 'numberfield',
	            }, 
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
			    sortable: false,
	            field: {
	                xtype: 'numberfield',
	            }, 	        },{
			    header: 'SubTot', 
			    dataIndex: 'subtot2', 
	            //summaryType: 'sum',
			    sortable: false,
	            renderer: function(value, metaData, record, rowIndex, colIndex, store) {
	                return record.get('calibro') * record.get('dollarialpezzo');
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
	    
//	    buttons: [{
//	        text: 'Inserisci',
//	//            y:200,
//	//            x:200,
//            width:100,
//            height: 50,
//	        handler: function() {
//	            var form = this.up('form').getForm();
//	            if(form.isValid()){
//	                form.submit({
//	                    url: 'Container',
//	                    waitMsg: 'Sto caricando i dati',
//	                    success: function(fp, o) {
//	                        Ext.Msg.alert('Success', 'Your file "' + o.result.file + '" has been uploaded.');
//	                    }
//	                
//	                });
//	            }
//	        }
//	    }]
	    

	});

	
	
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