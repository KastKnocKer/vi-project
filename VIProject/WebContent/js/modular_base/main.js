/*VARIABILI GLOBALI*/
var _toolbar;
var _viewPort;
var _viewPort_panel_east;
var _viewPort_panel_west;


/* Funzione main */
var modular_base_main = function modular_base_main(){
	
	Ext.create('Ext.container.Viewport', {
	    layout: 'border',
	    items: [{
	        region: 'north',
	        html: '<h1 class="x-panel-header">Page Title</h1>',
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
	        activeTab: 0,      // First tab active by default
	        items: {
	            title: 'Default Tab',
	            html: 'The first tab\'s content. Others may be added dynamically'
	        }
	    }]
	});
	
	
	
//	Ext.define('Ext.app.Portal', {
//
//	    extend: 'Ext.container.Viewport',
//
//	    uses: ['Ext.app.PortalPanel'],
//
//	    initComponent: function(){
//	        Ext.apply(this, Ext.create('Ext.Viewport', {
//	            id: 'main-viewport',
//	            layout: {
//	                type: 'border',
//	                padding: '0 5 5 5'
//	            },
//	            items: [{
//	                title: 'My Notifications',
//	                id: 'My-Notifications-Panel',
//	                region: 'north',
//	                height: 300,
//	                split: true,
//	                collapsible: true,
//	                collapsed: true,
//	                margins: '0 0 0 0',
//	                layout: 'accordion',
//	                items: [
//	                {
//	                    title: 'Alerts'
//	                },{
//	                    title: 'Communications'
//	                }
//	                ]
//	            },{
//	                title: 'My Support',
//	                id: 'My-Support-Panel',
//	                region: 'east',
//	                width: 140,
//	                collapsible: true,
//	                collapsed: true,
//	                margins: '0 0 0 0',
//	                layout: 'column',
//	                autoScroll: true,
//	                defaults: {
//	                    margins: '10 5 0 0',
//	                    xtype: 'panel',
//	                    height: 100,
//	                    width: '100%',
//	                    headerPosition: 'bottom',
//	                    border: false,
//	                    cls: 'myicon',
//	                    bodyStyle: 'background-image: url(images/icon.png); background-repeat: no-repeat; background-position: center;'
//	                },
//	                items:[
//	                    {
//	                        title: 'Customer Services'
//	                    },{
//	                        title: 'Technical Support',
//	                        listeners: {
//	                            afterrender: function(c){
//	                                c.el.on('click', function(){
//	                                    CreateChatSession();
//	                                    Ext.getCmp('My-Support-Chat-Panel').update('<iframe width="100%" height="700" src="/pub/" frameborder="0"></iframe>');
//	                                });
//	                            }
//	                        }
//	                    }
//	                ]
//	            },{
//	                xtype: 'panel',
//	                region: 'west',
//	                collapsible: true,
//	                collapsed: true,
//	                title: 'My Apps',
//	                width: 275,
//	                layout:'accordion',
//	                split: true,
//	                margins: '0 0 0 0',
//	                defaults: {
//	                    bodyStyle: 'padding:15px',
//	                    layout: 'column'
//	                },
//	                items: [{
//	                    title: 'Internal Apps',
//	                    defaults: {
//	                        padding: '5 5 5 5',
//	                        xtype: 'panel',
//	                        height: 100,
//	                        width: 80,
//	                        headerPosition: 'bottom',
//	                        border: false,
//	                        cls: 'myicon',
//	                        bodyStyle: 'background-image: url(images/icon.png); background-repeat: no-repeat; background-position: center;'
//	                    },
//	                    items: []
//	                },{
//	                    title: 'Favorites',
//	                    defaults: {
//	                        padding: '5 5 5 5',
//	                        xtype: 'panel',
//	                        height: 100,
//	                        width: 80,
//	                        headerPosition: 'bottom',
//	                        border: false,
//	                        cls: 'myicon',
//	                        bodyStyle: 'background-image: url(images/icon.png); background-repeat: no-repeat; background-position: center;'
//	                    },
//	                    items: []
//	                },{
//	                    title: 'Reporting',
//	                    defaults: {
//	                        padding: '5 5 5 5',
//	                        xtype: 'panel',
//	                        height: 100,
//	                        width: 80,
//	                        headerPosition: 'bottom',
//	                        border: false,
//	                        cls: 'myicon',
//	                        bodyStyle: 'background-image: url(images/icon.png); background-repeat: no-repeat; background-position: center;'
//	                    },
//	                    items: []
//	                }]
//	            },
//	                Ext.create('Ext.tab.Panel', {
//	                    region: 'center',
//	                    layout: 'fit',
//	                    items: [{
//	                        id: 'Workspace-1',
//	                        title: 'Workspace 1',
//	                        layout: 'fit',
//	                        items: [{
//	                            id: 'app-portal',
//	                            xtype: 'portalpanel',
//	                            region: 'center',
//	                            items: [{
//	                                id: 'col-1',
//	                                items: [{
//	                                    id: 'portlet-2',
//	                                    title: 'Portlet 2',
//	                                    listeners: {
//	                                        'close': Ext.bind(this.onPortletClose, this)
//	                                    }
//	                                }]
//	                            },{
//	                                id: 'col-2',
//	                                items: [{
//	                                    id: 'portlet-3',
//	                                    title: 'Portlet 3',
//	                                    listeners: {
//	                                        'close': Ext.bind(this.onPortletClose, this)
//	                                    }
//	                                }]
//	                            }]
//	                        }]
//	                    }]
//	                })
//	            ]
//	        }));
//	        this.callParent(arguments);
//	    },
//	    renderTo: 'div_centrale'
//	});

	
	
	
//	var modular_base_app = Ext.application({
//	    name: 'MyApp',
//	    launch: function() {
//	        Ext.create('Ext.container.Viewport', {
//	            items: {
//	                html: 'My App'
//	            }
//	        });
//	    },
//	    renderTo: 'div_centrale'
//	});
	
//	var form_login = Ext.create('Ext.form.Panel', {
//	    title: 'Login',
//	    bodyPadding: 5,
//	    width: 350,
//	    //height: 600,
//
//	    // The form will submit an AJAX request to this URL when submitted
//	    url: 'login?tipoAccesso=CASSIERE',
///*
//	    // Fields will be arranged vertically, stretched to full width
//	    layout: 'anchor',
//	    defaults: {
//	        anchor: '100%'
//	    },
//	    */
//
//	    // The fields
//	    defaultType: 'textfield',
//	    items: [{
//	        fieldLabel: 'Username',
//	        name: 'username',
//	        allowBlank: false
//	    },{
//	        fieldLabel: 'Password',
//	        name: 'password',
//	        inputType: 'password',
//	        allowBlank: false
//	    }/*,{	//Possibile registrazione futura
//            xtype: 'displayfield',
//            //name: 'displayfield1',
//            //fieldLabel: 'Registrati',
//            value: 'Se non hai ancora registrato il tuo ristorante clicca <a href="index_registrazione.jsp">qui</a>!'
//        }*/],
//
//	    // Reset and Submit buttons
//	    buttons: [{
//	        text: 'Reset',
//	        handler: function() {
//	            this.up('form').getForm().reset();
//	        }
//	    }, {
//	        text: 'Login',
//	        formBind: true, //only enabled once the form is valid
//	        disabled: true,
//	        handler: function() {
//	            var form = this.up('form').getForm();
//	            if (form.isValid()) {
//	                form.submit({
//	                    success: function(form, action) {
//	                    	Ext.Msg.alert('Info:', action.result.message);
//	                    	location.replace('index_desktop.jsp');
//	                    },
//	                    failure: function(form, action) {
//	                    	Ext.Msg.alert('Failed', action.result.message);
//	                    }
//	                });
//	            }
//	        }
//	    }],
//	    renderTo: 'div_centrale'
//	});


};