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
	        {"num":"1", "name":"1 Frontespizio"},
	        {"num":"2", "name":"2 Conferma ordini fornitore"},
	        {"num":"3", "name":"3 Richiesta booking"},
	        {"num":"4", "name":"4 Conferma booking"},
	        {"num":"5", "name":"5 Etichette pallet"},
	        {"num":"6", "name":"6 Packing list fornitore – cliente"},
	        {"num":"7", "name":"7 Richiesta doc. carico container"},
	        {"num":"8", "name":"8 Lettera di vettura"},
	        {"num":"9", "name":"9 Agecontrol"},
	        {"num":"10", "name":"10 Fitosanitario-Coldtreatment"},
	        {"num":"11", "name":"11 Fumigazione"},
	        {"num":"12", "name":"12 Bolla fornitore"},
	        {"num":"13", "name":"13 Bolla cliente"},
	        {"num":"14", "name":"14 Fattura cliente"},
	        {"num":"15", "name":"15 Fattura fornitore"},
	        {"num":"16", "name":"16 DHL ricevuto"},
	        {"num":"17", "name":"17 Fornitore – acconto 50%"},
	        {"num":"18", "name":"18 Bill of loading"},
	        {"num":"19", "name":"19 Fattuar di acconto"},
	        {"num":"20", "name":"20 Documenti ricevuti per posta dal fornitore"},
	        {"num":"21", "name":"21 Cliente – acconto 50%"}
	        
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
            allowBlank: false,
	        name: 'nrLotto'
	    },
	    {
	    	xtype: 'textfield',
	        fieldLabel: 'Num Container',
	        id: 'Container',
            allowBlank: false,
	        name: 'nrContainer'
        }, {
            xtype: 'combo',
            id: 'Tipo',
            fieldLabel: 'Tipo di file',
            emptyText: 'Seleziona il tipo',
            name: 'Tipo',
            queryMode: 'local',
            displayField: 'name',
            valueField: 'num',
            hiddenName:'cTypeID',
            hiddenValue:0,
            store: filetipe
        }, {
            xtype: 'button',
            text: 'Send',
            id:'Sendbutton',
            handler:function(){
                Ext.Ajax.request({
                    waitMsg:'Searching',
                    url: 'ContainerFileUpload',
                    method:'post',
                    params:{
                        type:Ext.getCmp('Tipo').getValue()         
                    },
                    success:function(){
                        Ext.Msg.alert('It worked')
                    },
                    failure:function(){
                        Ext.Msg.alert('Epic Fail')
                        
                    }
                });
            }
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
	myTabPanel.add(prova_form_upload);
	//myTabPanel.add(prova_drag_button);
}