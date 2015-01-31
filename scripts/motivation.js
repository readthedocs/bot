module.exports = function (robot) {
    robot.hear(/!m(.*)$/i, function (msg) {
        var messages = ["You're doing great work, {0}!",
                        "Keep up the great work, {0}!",
                        "Nice job, {0}!"];
        var target = msg.match[1].trimLeft();
        if (target == '') {
            target = 'everyone';
        }
        var message = messages[Math.floor(Math.random() * messages.length)];
        msg.send(message.replace('{0}', target));
    });
    robot.hear(/!dm(.*)$/i, function (msg) {
        var messages = ["You're doing awful work, {0}!",
                        "What do you think you are doing, {0}?!",
                        "Get your shit together, {0}!"];
        var target = msg.match[1].trimLeft();
        if (target == '') {
            target = 'everyone';
        }
        var message = messages[Math.floor(Math.random() * messages.length)];
        msg.send(message.replace('{0}', target));
    });
};
