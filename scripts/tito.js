/* Tito integration */

module.exports = function (robot) {
  robot.router.post('/services/tito', function (req, res) {
    try {
      var attendee = req.body,
          hook_name = req.get('X-Webhook-Name');
      if (hook_name == 'ticket.updated' && attendee.state_name == 'complete') {
          robot.messageRoom(
            'conference',
            attendee.name + ' (' + attendee.email + ') bought a ' + attendee.release + ' ticket');
      }
      console.dir(req.body);
    } catch (error) {
      console.log(error);
    }
    res.send('OK');
  });
};
