const { Client, Intents } = require('discord.js');
const process = require('process'); 

module.exports = function (robot) {
  const bot = new Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_VOICE_STATES,
    ]
  });
  const slack_room = "testing";
  var channels = {};

  bot.login(process.env.DISCORD_BOT_TOKEN);

  bot.once('ready', () =>{
    console.log('Bot ready.');
  })

  const announce_members = (members, channel) => {
    if (members.length) {
      const member_list = members.join(', ');
      const member_verb = (members.length == 1) ? 'is' : 'are';
      robot.messageRoom(
        slack_room,
        `${member_list} ${member_verb} in voice channel "${channel.name}"`,
      );
    }
    else {
      robot.messageRoom(
        slack_room,
        `Everyone left voice channel "${channel.name}"`,
      );        
    }
  }

  const update_channel = (channel) => {
    if (!channel) {
      return false;
    }

    let members = [];
    if (channel.members) {
      members = Array.from(
        channel.members.mapValues(member => member.displayName).values()
      );
    }

    const channel_before = channels[channel.name] || [];
    if (members.length != channel_before.length) {
      announce_members(members, channel);
    }

    channels[channel.name] = members;
  }
  
  bot.on('voiceStateUpdate', (oldMember, newMember) => {
    update_channel(oldMember.channel);
    update_channel(newMember.channel);  
  });
};