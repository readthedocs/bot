/* Bitbucket integration */

module.exports = function (robot) {
  robot.router.post('/services/bitbucket', function (req, res) {
    try {
      var ev = req.body;
      console.dir(ev);

      /*
      robot.messageRoom(
          'random',
          build.reponame + ' tests are ' + build.status + ' for commit ' + build.vcs_revision
      );
      */
    } catch (error) {
      console.log(error);
    }
    res.send('OK');
  });
};
