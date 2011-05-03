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

var signUpToolbar = new Ext.Toolbar({
  dock: 'top',
  title: 'Sign up',
  items: [backButton]
});

var signUpForm = {
  id: 'signup-form',
  xtype: 'form',
  fullscreen: true,
  items: [{
    xtype: 'fieldset',
    instructions: 'Please enter the information above.',
    defaults: {
      labelWidth: '35%',
      required: true,
      useClearIcon: true,
      autoCapitalize: true
    },
    items: [{
      xtype: 'textfield',
      name : 'name',
      label: 'Fullname'
    }, {
      xtype: 'textfield',
      name : 'nickname',
      label: 'Nickname'
    }, {
      xtype: 'emailfield',
      name : 'email',
      label: 'Email',
      placeHolder: 'name@example.com',
      autoCapitalize: false
    }, {
      xtype: 'passwordfield',
      name : 'password',
      label: 'Password',
      placeHolder: 'minimum 6 characters',
      useClearIcon: false,
      autoCapitalize: false
    }, {
      xtype: 'passwordfield',
      name : 'password_confirmation',
      label: 'Confirm',
      useClearIcon: false,
      autoCapitalize: false
    }, {
      xtype: 'textfield',
      name : 'mobile',
      label: 'Mobile',
      autoCapitalize: false
    }, {
      xtype: 'textareafield',
      name : 'work',
      label: 'What do you do?'
    }, {
      xtype: 'textfield',
      name : 'referrer_id',
      label: 'Referrer',
      required: false
    }, {
      xtype: 'checkboxfield',
      name : 'join',
      label: 'Join the party?',
      required: false,
      value: 1
    }]
  }, {
    xtype: 'button',
    ui: "confirm",
    text: 'Submit',
    width: 100,
    flex: 1,
    style: 'margin: .5em auto;',
    handler: function(){
      var form = Ext.getCmp('signup-form').getValues();
      Ext.Ajax.request({
        url: '/users.json',
        params: {
          'user[name]': form.name,
          'user[nickname]': form.nickname,
          'user[email]': form.email,
          'user[password]': form.password,
          'user[password_confirmation]': form.password_confirmation,
          'user[mobile]': form.mobile,
          'user[work]': form.work,
          'user[referrer_id]': form.referrer_id,
          'user[join]': form.join != 1 ? '0' : form.join,
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
            Ext.getCmp('signup-form').reset();
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
      Ext.getCmp('signup-form').reset();
    }
  }]
}

var signUpWrapperPanel = new Ext.Panel({
  layout: 'vbox',
  scroll: 'vertical',
  items: [signUpForm]
});

var signUpPanel = new Ext.Panel({
  layout: 'card',
  dockedItems: [signUpToolbar],
  items: [signUpWrapperPanel]
});
