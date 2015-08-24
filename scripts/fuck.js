/* Do it live */

var fuck_it = [
    'http://cdn.meme.am/images/300x/6116745.jpg',
    'http://i.giphy.com/cQvWXrpNnEig8.gif'
];

module.exports = function (robot) {
    robot.hear(/\bfuck it\b/i, function (msg) {
        msg.send(msg.random(fuck_it));
    });
};
