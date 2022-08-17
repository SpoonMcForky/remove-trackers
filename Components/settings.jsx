const { React } = require('powercord/webpack');
const { SwitchItem } = require('powercord/components/settings');
const { TextInput } = require('powercord/components/settings');
module.exports = class settings extends React.PureComponent {
  render() {
    return (
      <div>>
        <SwitchItem
          value={this.props.getSetting('vx')}
          onChange={() => this.props.toggleSetting('vx')}
        >
          Enable or Disable changing Twitter embeds.
        </SwitchItem>

      </div>
    );
  }
};
