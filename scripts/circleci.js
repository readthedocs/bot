/* Test integration */

module.exports = function (robot) {
  robot.router.post('/services/circleci', function (req, res) {
    try {
      var build = req.body.payload;
      robot.messageRoom(
          'random',
          build.reponame + ' tests are ' + build.status + ' for commit ' + build.vcs_revision
      );
    } catch (error) {
      console.log(error);
    }
    res.send('OK');
  });
};
