var backButton = new Ext.Button({
  ui: 'back',
  text: 'Back',
  handler: function(){
    mainPanel.setActiveItem(0, {
      type: 'slide',
      reverse: true
    }, false);
  }
});

var signInToolbar = new Ext.Toolbar({
  dock: 'top',
  title: 'Sign in',
  items: [backButton]
});

var signInForm = {
  id: 'signin-form',
  xtype: 'form',
  fullscreen: true,
  items: [{
    xtype: 'fieldset',
    defaults: {
      labelWidth: '35%',
      required: true,
      useClearIcon: true,
      autoCapitalize: false
    },
    items: [{
      xtype: 'emailfield',
      name : 'email',
      label: 'Email',
      placeHolder: 'name@example.com',
    }, {
      xtype: 'passwordfield',
      name : 'password',
      label: 'Password',
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
        url: '/users/sign_in.json',
        params: {
          'user[email]': form.email,
          'user[password]': form.password,
        },
        method: 'POST',
        success: function(response){
          var jsonData = Ext.util.JSON.decode(response.responseText);
          if(jsonData.success) {
            sign_in = true;
            signOutButton.show();
            signInButton.hide();
            signUpButton.hide();
            bingoButton.show();
            Ext.getCmp('signin-form').reset();
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

var signInWrapperPanel = new Ext.Panel({
  layout: 'vbox',
  scroll: 'vertical',
  items: [signInForm]
});

var signInPanel = new Ext.Panel({
  layout: 'card',
  dockedItems: [signInToolbar],
  items: [signInWrapperPanel]
});
