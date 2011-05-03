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

var meetingToolbar = new Ext.Toolbar({
  dock: 'top',
  title: 'Meeting Details',
  items: [backButton]
});

var meetingWrapperPanel = new Ext.Panel({
  layout: 'vbox',
  scroll: 'vertical',
  html: 'Meeting Details'
});

var meetingPanel = new Ext.Panel({
  layout: 'card',
  dockedItems: [meetingToolbar],
  items: [meetingWrapperPanel]
});
