/* Replit keepalive */

module.exports = function (robot) {
  robot.router.post('/heroku/keepalive', function (req, res) {
    console.log('Received keepalive ping.')
    res.send('Alive!');
  });
};