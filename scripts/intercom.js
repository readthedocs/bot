module.exports = function (robot) {
  robot.router.post('/services/intercom', function (req, res) {
    try {
      var data = req.body;
      console.dir(data);
      robot.messageRoom(
        'random',
        data.topic + ' for ' + data.data
      );
    } catch (error) {
      console.log(error);
    }
    res.send('OK');
  });
};
