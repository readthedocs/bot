/* Test integration */

module.exports = function (robot) {
    robot.router.post('/test', function (req, res) {
        try {
            console.dir('Got HTTP Post')
            console.dir(req.body);
        } catch (error) {
            console.log(error);
        }
        res.send('OK');
    });
};
