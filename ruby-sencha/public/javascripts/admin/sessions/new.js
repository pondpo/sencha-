var signInToolbar = new Ext.Toolbar({
  dock: 'top',
  title: 'Sign in'
});

var signInForm = {
  id: 'signin-form',
  xtype: 'form',
  fullscreen: true,
  items: [{
    xtype: 'fieldset',
    title: 'Sign in as administrator',
    defaults: {
      useClearIcon: true,
      autoCapitalize: false
    },
    items: [{
      xtype: 'emailfield',
      name : 'email',
      placeHolder: 'E-mail address'
    }, {
      xtype: 'passwordfield',
      name : 'password',
      placeHolder: 'Password',
    }]
  }, {
    xtype: 'button',
    ui: "confirm",
    text: 'Submit',
    width: 100,
    flex: 1,
    style: 'margin: .5em auto;',
    handler: function(){
      var form = Ext.getCmp('signin-form').getValues();
      Ext.Ajax.request({
        url: '/admins/sign_in.json',
        params: {
          'admin[email]': form.email,
          'admin[password]': form.password,
        },
        method: 'POST',
        success: function(response){
          var jsonData = Ext.util.JSON.decode(response.responseText);
          if(jsonData.success) {
            signIn = true;
            Ext.getCmp('signin-form').reset();
            Ext.Msg.alert('Success', jsonData.message);
            mainPanel.setActiveItem(1);
          }
          else {
            Ext.Msg.alert('Failed', jsonData.error);
          }
        },
        failure: function(response){
          var jsonData = Ext.util.JSON.decode(response.responseText);
          Ext.Msg.alert('Failed', jsonData.error);
        }
      });
    }
  }, {
    xtype: 'button',
    width: 100,
    text: 'Reset',
    flex: 1,
    style: 'margin: .5em auto;',
    handler: function(){
      Ext.getCmp('signin-form').reset();
    }
  }]
}

var signInPanel = new Ext.Panel({
  layout: 'card',
  dockedItems: [signInToolbar],
  items: [signInForm]
});
