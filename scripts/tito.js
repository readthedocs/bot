/* Tito integration */

module.exports = function (robot) {
  robot.router.post('/services/tito', function (req, res) {
    try {
      var attendee = req.body.payload;
      robot.messageRoom(
        'random',
        attendee.name + '(' + attendee.email + ') bought a ' + attendee.release + ' ticket'
        )
        console.dir(req.body);
    } catch (error) {
      console.log(error);
    }
    res.send('OK');
  });
};
