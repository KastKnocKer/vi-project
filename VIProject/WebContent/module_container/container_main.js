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
	
	
	
	
	var prova_form_upload = Ext.create('Ext.form.Panel', {
	    title: 'Upload a Photo',
	    width: 400,
	    bodyPadding: 10,
	    frame: true,
	    renderTo: Ext.getBody(),
	    items: [{
	        xtype: 'filefield',
	        name: 'photo',
	        fieldLabel: 'Photo',
	        labelWidth: 50,
	        msgTarget: 'side',
	        allowBlank: false,
	        anchor: '100%',
	        buttonText: 'Select Photo...'
	    }],

	    buttons: [{
	        text: 'Upload',
	        handler: function() {
	            var form = this.up('form').getForm();
	            if(form.isValid()){
	                form.submit({
	                    url: 'photo-upload.php',
	                    waitMsg: 'Uploading your photo...',
	                    success: function(fp, o) {
	                        Ext.Msg.alert('Success', 'Your photo "' + o.result.file + '" has been uploaded.');
	                    }
	                });
	            }
	        }
	    }]
	});
	
	var myTabPanel = Ext.getCmp('main_tabpanel');
	myTabPanel.add(prova_form_upload);
}