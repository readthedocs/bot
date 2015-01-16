/* Test integration */

module.exports = function (robot) {
    robot.router.post('/test', function (req, res) {
        try {
            var data = JSON.parse(req.body.payload);
            robot.messageRoom('random', req.body.payload);
        } catch (error) {
            console.log(error);
        }
        res.send('OK');
    });
};
