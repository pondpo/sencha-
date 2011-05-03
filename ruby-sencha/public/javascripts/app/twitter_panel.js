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

var twitterTimeline = new Ext.Component({
  cls: 'timeline',
  scroll: 'vertical',
  tpl: [
  '<tpl for=".">',
    '<div class="tweet">',
      '<div class="tweet-content">',
        '<h2>{from_user}</h2>',
        '<p>{text}</p>',
      '</div>',
      '<div class="tweetarrow"><img src="/images/arrow.png"/></div>',
      '<div class="avatar"><img src="{profile_image_url}" /></div>',
    '</div>',
  '</tpl>']
});

var refresh = function() {
  Ext.util.JSONP.request({
      url: 'http://search.twitter.com/search.json',
      callbackKey: 'callback',
      params: {
        q: 'petdo',
        rpp: 20
      },
      callback: function(data) {
        data = data.results;
        // Update the tweets in timeline
        twitterTimeline.update(data);
      }
    });
}

var refreshButton = new Ext.Button({
  ui: 'mask',
  text: 'Refresh',
  handler: refresh()
});

var twitterToolbar = new Ext.Toolbar({
  dock: 'top',
  title: 'TBWA\\Social',
  items: [backButton, {xtype: 'spacer'}, refreshButton]
});

var twitterPanel = new Ext.Panel({
  layout: 'card',
  dockedItems: [twitterToolbar],
  items: [twitterTimeline]
});
