/* Basic logging integration */

module.exports = function (robot) {
    robot.router.post('/services/logger', function (req, res) {
        try {
            var msg = req.body,
            parts = [];

            if (msg.name) {
                parts.push(msg.name + ':');
            }
            if (msg.error && msg.error == 'True') {
                // TODO don't do that ^
                parts.push('ERROR');
            }
            if (msg.text) {
                parts.push(msg.text);
            }

            if (parts.length > 0) {
                robot.messageRoom(
                    'ops',
                    parts.join(' ')
                );
            }
        } catch (error) {
            console.log(error);
        }
        res.send('OK');
    });
};
