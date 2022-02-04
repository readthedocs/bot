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

  bot.login(process.env.DISCORD_BOT_TOKEN);

  bot.once('ready', () =>{
    console.log('Bot ready.');
  })

  bot.on('voiceStateUpdate', (oldMember, newMember) => {
    if (newMember.channel) {
      // Joined
      robot.messageRoom(
        slack_room,
        `${newMember.member.displayName} joined voice channel "${newMember.channel.name}"`,
      );
    }
    else if (oldMember.channel) {
      // Parted
      robot.messageRoom(
        slack_room,
        `${oldMember.member.displayName} left "${oldMember.channel.name}"`,
      );
    }
  });
};