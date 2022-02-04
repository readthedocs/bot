/* Test integration */

module.exports = function (robot) {
  robot.router.post('/services/circleci', function (req, res) {
    robot.messageRoom('testing', 'TEST');
    res.send('OK');
  });
};
