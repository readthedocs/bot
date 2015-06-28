/* Bitbucket integration */

module.exports = function (robot) {

    // Output actions to robot
    var message_bitbucket_action = function (username, actions, target, link) {
        msg = [];
        msg.push(username);
        msg.push(actions.join(', '));
        msg.push('on');
        msg.push(target);
        msg.push('[' + link + ']');

        robot.messageRoom('general', 'Bitbucket told me ' + msg.join(' '));
    }

    robot.router.post('/services/bitbucket', function (req, res) {
        try {
            var ev = req.body,
            msg = [];

            // Get message on event type
            if ('issue' in ev) {
                var issue = ev.issue,
                    actor = ev.actor,
                    repo = ev.repository,
                    has_changes = 'changes' in ev,
                    has_comments = 'comment' in ev,
                    is_new = !(has_changes || has_comments);

                // Don't process on comments
                if (is_new) {
                    message_bitbucket_action(
                        actor.username,
                        ['created issue'],
                        repo.name + '#' + issue.id + ' "' + issue.title + '"',
                        issue.links.html.href
                    );
                }
                else if (has_changes) {
                    var changes = ev.changes,
                        updates = [];

                    Object.keys(changes).forEach(function (val, index, arr) {
                        updates.push([
                            'updated',
                            val,
                            'from',
                            changes[val].old,
                            'to',
                            changes[val].new
                        ].join(' '))
                    });

                    message_bitbucket_action(
                        actor.username,
                        updates,
                        repo.name + '#' + issue.id + ' "' + issue.title + '"',
                        issue.links.html.href
                    );
                }
            }
            else if ('pullrequest' in ev) {
                var pullrequest = ev.pullrequest,
                    actor = ev.actor,
                    repo = ev.repository;

                message_bitbucket_action(
                    actor.username,
                    // Seriously bitbucket, there is no information in your API
                    // on whatever the fuck changed here? UGH
                    ['did something'],
                    'pull request' + repo.name + '#' + pullrequest.id + ' "' + pullrequest.title + '" (' + pullrequest.state + ')',
                    pullrequest.links.html.href
                );

            }
        } catch (error) {
            console.log(error);
        }
        res.send('OK');
    });
};
