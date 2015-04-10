/* Tito integration */

module.exports = function (robot) {
  robot.router.post('/services/stripe', function (req, res) {
    try {
      var stripe_event = req.body;

      if (stripe_event.type = 'charge.succeeded') {
        var charge = stripe_event.data.object,
            amount = charge.amount / 100,
            live = charge.livemode,
            info = 'live';

        if (!live) {
          info = 'test';
        }
        robot.messageRoom(
          'random',
          'Just got a ' + info + ' donation for $' + amount);
      }
      else {
        console.dir(stripe_event);
      }
    } catch (error) {
      console.log(error);
    }
    res.send('OK');
  });
};
