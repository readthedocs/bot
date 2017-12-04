module.exports = function (robot) {
  robot.router.post('/services/intercom', function (req, res) {
    try {
      var data = req.body;
      console.dir(data);

      var msg;
      if (data.topic == 'user.created') {
        msg = 'New user: ' + data.data.item.name + '!';
      }
      else if (data.topic == 'company.created') {
        msg = 'New company: ' + data.data.item.name + '!';
      }
      else {
        console.log(data.topic + ' for ' + data.data.item.type);
        console.dir(data.data);
      }
      robot.messageRoom('random', msg);
    } catch (error) {
      console.log(error);
    }
    res.send('OK');
  });
};
