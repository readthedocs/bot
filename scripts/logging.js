/* Basic logging integration */

module.exports = function (robot) {
  robot.router.post('/services/logger', function (req, res) {
    try {
      var msg = req.body;
      robot.messageRoom(
          'general',
          msg.name + ': ' + msg.text
      );
    } catch (error) {
      console.log(error);
    }
    res.send('OK');
  });
};
