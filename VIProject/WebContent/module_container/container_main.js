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
	    }, {
	        region: 'south',
	        title: 'South Panel',
	        collapsible: true,
	        html: 'Information goes here',
	        split: true,
	        height: 100,
	        minHeight: 100
	    }, {
	        region: 'east',
	        title: 'East Panel',
	        collapsible: true,
	        split: true,
	        width: 150
	    }, {
	        region: 'center',
	        xtype: 'tabpanel', // TabPanel itself has no title
	        id: 'main_tabpanel',
	        activeTab: 0,      // First tab active by default
	        items: [{
	            title: 'Default Tab 0',
	            html: 'The first tab\'s content. Others may be added dynamically'
	        },{
	            title: 'Default Tab 1',
	            html: 'The first tab\'s content. Others may be added dynamically'
	        }]
	    }]
	});
	
	
	// The data store containing the list of type of file
	var filetipe = Ext.create('Ext.data.Store', {
	    fields: ['num', 'name'],
	    data : [
	        {"num":"1", "name":"1 FRONTESPIZIO"},
	        {"num":"2", "name":"2 CONFERMA ORDINI FORNITORE"},
	        {"num":"3", "name":"3 RICHIESTA BOOKING"},
	        {"num":"4", "name":"4 CONFERMA BOOKING"},
	        {"num":"5", "name":"5 ETICHETTE PALLET"},
	        {"num":"6", "name":"6 PACKING LIST FORNITORE – CLIENTE"},
	        {"num":"7", "name":"7 RICHIESTA DOC. CARICO CONTAINER"},
	        {"num":"8", "name":"8 LETTERA DI VETTURA *"},
	        {"num":"9", "name":"9 AGECONTROL *"},
	        {"num":"10", "name":"10 FITOSANITARIO* - COLDTREATMENT *"},
	        {"num":"11", "name":"11 FUMIGAZIONE"},
	        {"num":"12", "name":"12 BOLLA FORNITORE"},
	        {"num":"13", "name":"13 BOLLA CLIENTE"},
	        {"num":"14", "name":"14 FATTURA CLIENTE *"},
	        {"num":"15", "name":"15 FATTURA FORNITORE"},
	        {"num":"16", "name":"16 # DHL RICEVUTO"},
	        {"num":"17", "name":"17 FORNITORE – ACCONTO 50%"},
	        {"num":"18", "name":"18 BILL OF LOADING"},
	        {"num":"19", "name":"19 FATTURA DI ACCONTO"},
	        {"num":"20", "name":"20 DOCUMENTI RICEVUTI PER POSTA DAL FORNITORE"},
	        {"num":"21", "name":"21 CLIENTE – ACCONTO 50%"}
	        
	    ]
	});
	//TODO: aggiungere drag e drop
	var prova_form_upload = Ext.create('Ext.form.Panel', {
	    title: 'Upload a File',
	    width: 400,
	    bodyPadding: 10,
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
	    },
	    {
	        xtype: 'textfield',
	        fieldLabel: 'Num Lotto',
	        id: 'Lotto',
	        name: 'nrLotto'
	    },
	    {
	    	xtype: 'textfield',
	        fieldLabel: 'Num Container',
	        id: 'Container',
	        name: 'nrContainer'
        }, {
            xtype: 'combo',
            id: 'Tipo',
            fieldLabel: 'Scegli il tipo di file',
            name: 'Tipo',
            queryMode: 'local',
            displayField: 'name',
            valueField: 'abbr',
            store: filetipe
	    }],

	    buttons: [{
	    	 text: "Ok",
	    	    handler: function () {
	    	        Ext.Ajax.request({
	    	            url: 'ContainerFileUpload',
	    	            success: function (){alert('Valori inviati!!!');},
	    	            failure: function (){alert('Errore di invio!!!');},
		                   params: { container: prova_form_upload.getForm().findField('Container').getValue(),
		                	             lotto: prova_form_upload.getForm().findField('Lotto').getValue() }
	    	        });
	    	    }
	    },{
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
	myTabPanel.add(prova_form_upload);
	//myTabPanel.add(prova_drag_button);
}