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
	
	var formprova = Ext.create('Ext.form.Panel', {
		id: 'form_prova',
	    title: 'Miriana Basic Form',
	    bodyPadding: 5,
	    width: 350,

	    // Any configuration items here will be automatically passed along to
	    // the Ext.form.Basic instance when it gets created.

	    // The form will submit an AJAX request to this URL when submitted
	    url: 'save-form.php',

	    items: [{
	        xtype: 'textfield',
	        fieldLabel: 'Field',
	        name: 'theField'
	    }],

	    buttons: [{
	        text: 'Submit',
	        handler: function() {
	            // The getForm() method returns the Ext.form.Basic instance:
	            var form = this.up('form').getForm();
	            if (form.isValid()) {
	                // Submit the Ajax request and handle the response
	                form.submit({
	                    success: function(form, action) {
	                       Ext.Msg.alert('Success', action.result.message);
	                    },
	                    failure: function(form, action) {
	                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
	                    }
	                });
	            }
	        }
	    }]
	});
	
	Ext.getCmp('main_tabpanel').add(formprova);
	
	
}