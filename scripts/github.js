module.exports = function (robot) {
    var search = /(\b[^#\s]+?|)#(\d+)\b/i;
    var multi_search = new RegExp(search.source, "gi");

    var fn_link_issue = function (input) {
        var match = input.match(search);
        console.log(match);

        var repo = match[1].trimLeft();
        var issue = match[2].trimLeft();

        if (repo === "") {
            repo = "readthedocs/readthedocs.org";
        }
        else if (repo.match(/^(?:rtd|rtfd|readthedocs)?-?ops$/i)) {
            repo = "readthedocs/readthedocs-ops";
        }
        else if (repo.match(/^(?:rtd|rtfd|readthedocs)?-?corp(?:|orate)-ops$/i)) {
            repo = "readthedocs/readthedocs-corporate-ops";
        }
        else if (repo.match(/^(?:rtd|rtfd|readthedocs)?-?ext$/i)) {
            repo = "readthedocs/readthedocs-ext";
        }
        else if (repo.match(/^(?:rtd|rtfd|readthedocs)?-?corp(?:|orate)$/i)) {
            repo = "readthedocs/readthedocs-corporate";
        }

        return "https://github.com/" + repo + "/issues/" + issue;
    };

    robot.hear(multi_search, function (msg) {
        var issues = [];

        msg.match.forEach(function (match) {
            issues.push(fn_link_issue(match));
        });

        if (issues) {
            var message = "Looks like you mentioned a GitHub issue:";
            issues.forEach(function (issue) {
                message = message + " " + issue;
            });
            msg.send(message);
        }
    });
};
