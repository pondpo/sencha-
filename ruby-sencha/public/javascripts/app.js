var mainPanel;

var signInButton = new Ext.Button({
  text: 'Sign in',
  ui: 'action',
  hidden: sign_in,
  handler: function() {
    mainPanel.setActiveItem(2);
  }
});

var signOutButton = new Ext.Button({
  text: 'Sign out',
  ui: 'action',
  hidden: !sign_in,
  handler: function() {
    Ext.Ajax.request({
      url: '/users/sign_out.json',
      method: 'GET',
      success: function(response){
        var jsonData = Ext.util.JSON.decode(response.responseText);
        if(jsonData.success) {
          sign_in = false;
          signOutButton.hide();
          signInButton.show();
          signUpButton.show();
          bingoButton.hide();
          Ext.Msg.alert('Success', jsonData.message);
          mainPanel.setActiveItem(0, {
            type: 'slide',
            reverse: true
            }, false);
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

var mainToolbar = new Ext.Toolbar({
  dock: 'top',
  title: Ext.is.Phone ? 'TBWA' : 'TBWA\\Reunion',
  items: [{xtype: 'spacer'}, signInButton, signOutButton]
});

var imagePanel = new Ext.Panel({
  html: '<div align="center"><img src="/images/sencha.png" width="210" height="291" /></div>',
});

var signUpButton = new Ext.Button({
  text: 'Sign up',
  hidden: sign_in,
  width: 180,
  style: {
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: '10px'
  },
  handler: function() {
    mainPanel.setActiveItem(1);
  }
});

var meetingButton = new Ext.Button({
  text: 'Meeting Details',
  width: 180,
  style: {
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: '10px'
  },
  handler: function() {
    mainPanel.setActiveItem(3);
  }
});

var bingoButton = new Ext.Button({
  text: 'Bingo',
  hidden: !sign_in,
  width: 180,
  style: {
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: '10px'
  },
  handler: function() {
    mainPanel.setActiveItem(4);
  }
});

var twitterButton = new Ext.Button({
  text: 'TBWA\\Social',
  width: 180,
  style: {
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: '10px'
  },
  handler: function() {
    mainPanel.setActiveItem(5);
  }
});

var homePanel = new Ext.Panel({
  layout: 'vbox',
  scroll: 'vertical',
  dockedItems: [mainToolbar],
  items: [imagePanel, signUpButton, meetingButton, bingoButton, twitterButton]
});
