const { Plugin } = require('powercord/entities');
const { inject, uninject } = require('powercord/injector');
const { messages } = require('powercord/webpack');

module.exports = class RemoveTracking extends Plugin {
  startPlugin() {
    this.patchMessage();
  }
  patchMessage() {
    inject('removeTracking', messages, 'sendMessage', args => {
      const x = args;
      if (x[1].content.search('https://open.spotify.com/track') !== -1) x[1].content = x[1].content.replace(/\?.[^\s]*/g, () => '');
      else if (x[1].content.search('https://twitter.com') !== -1) {
        x[1].content = x[1].content.replace(/\?.[^\s]*/g, () => '');
        x[1].content = x[1].content.replace(/https:\/\/twitter\.com/g, () => 'https://vxtwitter.com');
      } else if (x[1].content.search('https://www.tiktok.com/') !== -1) {
        x[1].content = x[1].content.replace(/\?.[^\s]*/g, () => '');
        x[1].content = x[1].content.replace(/https:\/\/www\.tiktok\.com/g, () => `https://tt-embed.com/?q=${x[1].content}`);
      } else if (x[1].content.search('https://www.facebook.com/marketplace/item/') !== -1) x[1].content = x[1].content.replace(/(\?ref).[^\s]*/g, () => '');
      return args;
    }, true);
  }
  pluginWillUnload() {
    uninject('removeTracking');
  }
};
