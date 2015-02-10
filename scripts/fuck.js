/* Do it live */

var fuck_it = [
    'http://cdn.meme.am/images/300x/6116745.jpg'
];

module.exports = function (robot) {
    robot.hear(/\bfuck it\b/i, function (msg) {
        msg.send(msg.random(fuck_it));
    });
};
