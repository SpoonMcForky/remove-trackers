const { Plugin } = require('powercord/entities');
const { inject, uninject } = require('powercord/injector');
const { messages } = require('powercord/webpack');

const Settings = require('./components/settings.jsx');

module.exports = class RemoveTracking extends Plugin {
  startPlugin() {
    this.setDefault('vx', false);
    powercord.api.settings.registerSettings(this.entityID, {
      category: this.entityID,
      label: 'Remove Trackers',
      render: Settings
    });
    this.patchMessage();
  }
  setDefault(name, defaultValue) {
    this.settings.set(name, this.settings.get(name, defaultValue));
  }
  patchMessage() {
    inject('removeTracking', messages, 'sendMessage', args => {
      const x = args;
      if (x[1].content.search('https://open.spotify.com/track') !== -1) x[1].content = x[1].content.replace(/\?.[^\s]*/g, () => '');
      else if (x[1].content.search('https://twitter.com') !== -1) {
        x[1].content = x[1].content.replace(/\?.[^\s]*/g, () => '');
        if (this.settings.get('vx')) x[1].content = x[1].content.replace(/https:\/\/twitter\.com/g, () => 'https://vxtwitter.com');
      } else if (x[1].content.search('https://www.tiktok.com/') !== -1) {
        x[1].content = x[1].content.replace(/\?.[^\s]*/g, () => '');
        x[1].content = x[1].content.replace(/https:\/\/www\.tiktok\.com/g, () => 'https://tt-embed.com/?q=https://www.tiktok.com');
      } else if (x[1].content.search('https://www.facebook.com/marketplace/item/') !== -1) x[1].content = x[1].content.replace(/(\?ref).[^\s]*/g, () => '');
      else if (x[1].content.search('https://steamcommunity.com/') !== -1) x[1].content = x[1].content.replace(/https:\/\/steamcommunity\.com/, () => 'steam://openurl/https://steamcommunity.com');
      else if (x[1].content.search('https://store.steampowered.com/') !== -1) x[1].content = x[1].content.replace(/https:\/\/store\.steampowered\.com/g, () => 'steam://openurl/https://store.steampowered.com/');
      else if (x[1].content.search('https://www.reddit.com/') !== -1) x[1].content = x[1].content.replace(/\?utm_source.[^\s]*/g, () => '');
      
      return args;
    }, true);
  }
  pluginWillUnload() {
    uninject('removeTracking');
  }
};
