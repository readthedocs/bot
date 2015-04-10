/* Tito integration */

module.exports = function (robot) {
  robot.router.post('/services/stripe', function (req, res) {
    try {
      var stripe_event = req.body;
      console.log(stripe_event);
      /*
      var attendee = req.body,
          hook_name = req.get('X-Webhook-Name');
      if (hook_name == 'ticket.updated' && attendee.state_name == 'complete') {
          robot.messageRoom(
            'conference',
            attendee.name + ' (' + attendee.email + ') bought a ' + attendee.release + ' ticket');
      }
      console.dir(req.body);
      */
    } catch (error) {
      console.log(error);
    }
    res.send('OK');
  });
};
