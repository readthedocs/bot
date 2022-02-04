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
};
