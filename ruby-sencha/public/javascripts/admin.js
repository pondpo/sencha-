var mainPanel;

var signOutButton = new Ext.Button({
  text: 'Sign out',
  ui: 'action',
  hidden: !signIn,
  handler: function() {
    Ext.Ajax.request({
      url: '/admins/sign_out.json',
      method: 'GET',
      success: function(response){
        var jsonData = Ext.util.JSON.decode(response.responseText);
        if(jsonData.success) {
          sign_in = false;
          Ext.Msg.alert('Success', jsonData.message);
          mainPanel.setActiveItem(0);
        }
        else {
          Ext.Msg.alert('Failed', jsonData.message);
        }
      },
      failure: function(response){ 
        var jsonData = Ext.util.JSON.decode(response.responseText);
        Ext.Msg.alert('Failed', jsonData.error);
      }
    });
  }
});

var homeDock = {
  title: 'Home',
  iconCls: 'home',
  layout: 'card',
  items: homePanel
}

var usersDock = {
  title: 'Users',
  iconCls: 'user',
  layout: 'card',
  items: usersPanel
}

var homeToolbar = new Ext.Toolbar({
  dock: 'top',
  title: 'Administration',
  items: [{xtype: 'spacer'}, signOutButton]
});

var adminPanel = new Ext.TabPanel({
  ui: 'dark',
  fullscreen: true,
  tabBar: {
    dock: 'bottom',
    layout: {
      pack: 'center'
    }
  },
  dockedItems: [homeToolbar],
  items: [homeDock, usersDock]
});
