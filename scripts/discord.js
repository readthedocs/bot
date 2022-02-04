const Discord = require('discord.js');
const process = require('process'); 


module.exports = function (robot) {
  const bot = new Discord.Client();

  bot.login(process.env.DISCORD_BOT_TOKEN);

  bot.once('ready', () =>{
    robot.messageRoom('testing', `Bot ${bot.user.tag} ready!`);
  })

  /*
  robot.router.post('/services/circleci', function (req, res) {
    robot.messageRoom('testing', 'TEST');
    res.send('OK');
  });
  */
};

/*

bot.on('voiceStateUpdate', (oldMember, newMember) => {
    let newUserChannel = newMember.voiceChannelID
    let oldUserChannel = oldMember.voiceChannelID

    if(newUserChannel === 712677767333937284) {
        // User Joins a voice channel
        console.log("Joined VC1")

    } else if(newUserChannel !== 712677767333937284){
        // User leaves a voice channel
        console.log("Left VC1")

    }
})
*/