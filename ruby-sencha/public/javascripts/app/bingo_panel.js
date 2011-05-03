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

var bingoToolbar = new Ext.Toolbar({
  dock: 'top',
  title: 'Bingo',
  items: [backButton]
});

var bingoWrapperPanel = new Ext.Panel({
  layout: 'vbox',
  scroll: 'vertical',
  html: 'Bingo'
});

var bingoPanel = new Ext.Panel({
  layout: 'card',
  dockedItems: [bingoToolbar],
  items: [bingoWrapperPanel]
});
