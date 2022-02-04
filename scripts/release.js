/* Release integration */

module.exports = function (robot) {
  robot.router.post('/release/community', function (req, res) {
    robot.messageRoom('testing', 'The `web` scaling group is restarting');
    res.send('OK');
  });
};
