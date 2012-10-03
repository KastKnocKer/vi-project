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
	
	
	
	
	var prova_form_upload = Ext.create('Ext.form.Panel', {
	    title: 'Upload a Photo',
	    width: 400,
	    bodyPadding: 10,
	    frame: true,
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
	
	var prova_drag_button = Ext.create('Ext.ux.upload.Button', {
		text: 'Select files',
		//singleFile: true,
		plugins: [{
                      ptype: 'ux.upload.window',
                      title: 'Upload',
                      width: 520,
                      height: 350
                  }
        ],
		uploader: 
		{
			url: 'upload.json',
			uploadpath: '/Root/files',
			autoStart: false,
			max_file_size: '2020mb',			
			drop_element: 'dragload',
			statusQueuedText: 'Ready to upload',
			statusUploadingText: 'Uploading ({0}%)',
			statusFailedText: '<span style="color: red">Error</span>',
			statusDoneText: '<span style="color: green">Complete</span>',

			statusInvalidSizeText: 'File too large',
			statusInvalidExtensionText: 'Invalid file type'
		},
		listeners: 
		{
			filesadded: function(uploader, files)								
			{
				//console.log('filesadded');
				return true;
			},
			
			beforeupload: function(uploader, file)								
			{
				//console.log('beforeupload');			
			},

			fileuploaded: function(uploader, file)								
			{
				//console.log('fileuploaded');
			},
			
			uploadcomplete: function(uploader, success, failed)								
			{
				//console.log('uploadcomplete');				
			},
			scope: this
		}
				
		
	});
	
	var myTabPanel = Ext.getCmp('main_tabpanel');
	myTabPanel.add(prova_form_upload);
	myTabPanel.add(prova_drag_button);
}