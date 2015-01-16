module.exports = function (robot) {
    robot.hear(/!m (.*)$/i, function (msg) {
        msg.send("You're doing great work, " + msg.match[1] + "!");
    });
    robot.hear(/!dm (.*)$/i, function (msg) {
        msg.send("You're doing awful work, " + msg.match[1] + "!");
    });
};
