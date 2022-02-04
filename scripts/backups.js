/* Backups integration */

// curl -X POST -v https://bot.agj2.repl.co/backups/community
module.exports = function (robot) {
  robot.router.post('/backups/community', function (req, res) {
    robot.messageRoom('testing', 'Backup was successful :the_horns:');
    res.send('OK');
  });
};
