const { Plugin } = require('powercord/entities');
const { inject, uninject } = require('powercord/injector');
const { messages } = require('powercord/webpack');

module.exports = class RemoveTracking extends Plugin {
  startPlugin() {
    this.patchMessage();
  }
  patchMessage() {
    inject('removeTracking', messages, 'sendMessage', args => {
      if (args[1].content.search('https://open.spotify.com/track') !== -1) args[1].content = args[1].content.replace(/\?.{19}/, '');
      else if (args[1].content.search('https://twitter.com') !== -1) {
        args[1].content = args[1].content.replace(/\?.+/, '');
        //https://www.tiktok.com/@richardsalesofficial/video/7127773315233598725?is_from_webapp=1&sender_device=pc
        args[1].content = args[1].content.replace(/https:\/\/twitter\.com/, 'https://vxtwitter.com');
      } else if (args[1].content.search('https://www.tiktok.com/') !== -1) {
        args[1].content = args[1].content.replace(/\?.+/, '');
        args[1].content = `https://tt-embed.com/?q=${ args[1].content}`;
      }
      return args;
    }, true);
  }
  pluginWillUnload() {
    uninject('removeTracking'); powercord.api.settings.unregisterSettings(this.entityID);
  }
};
