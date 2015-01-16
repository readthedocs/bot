/* Test integration */

module.exports = function (robot) {
  robot.router.post('/services/circleci', function (req, res) {
    try {
      var build = req.body.payload;
      robot.messageRoom(
          'random',
          build.reponame + ' tests are ' + build.outcome + ', thanks to ' + build.committer_name
      );
    } catch (error) {
      console.log(error);
    }
    res.send('OK');
  });
};
