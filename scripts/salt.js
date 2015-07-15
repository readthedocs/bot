/* Salt integration */

module.exports = function (robot) {
    robot.router.post('/services/salt', function (req, res) {
        try {
            /* Schema:
             *
             * {
             *     fun: 'state.highstate',
             *     id: 'web01',
             *     return: {
             *         statename: {
             *             comment: "...",
             *             name: "/etc/collectd/collectd.conf.d/memory.conf",
             *             start_time: "18:58:03.127159",
             *             result: true,
             *             duration: 1.898,
             *             __run_num__: 45,
             *             changes: {}
             *         }
             *     },
             *     output: 'long\noutput'
             * }
             */

            var data = req.body;
            console.dir(data);
            attachment = {};

            if (data.fun == 'state.highstate') {
                attachment.pretext = 'Ran provisioning on ' + data.id;
                if ('fun_args' in data) {
                    attachment.pretext += ' (' + data.fun_args + ')'
                }
                attachment.color = 'good';

                var counts = {},
                    output = [];

                for (state_id in data['return']) {
                    var state = data['return'][state_id],
                        state_name = state.result || 'None',
                        key = state_name.toString();

                    if (! counts.hasOwnProperty(key)) {
                        counts[key] = 0;
                    }
                    counts[key]++;

                    if (state.result != 'passing' && state.result !== true) {
                        output.push('');
                        if ('name' in state && 'comment' in state) {
                            output.push(state.name + ": " + state.comment);
                        }
                        if ('changes' in state && 'diff' in state.changes) {
                            output.push('```' + state.changes.diff + '```');
                        }
                    }
                }

                if ('pending' in counts && counts.pending > 0) {
                    attachment.color = 'warning';
                }
                if ('failing' in counts && counts.failing > 0) {
                    attachment.color = 'danger';
                }

                // Start output body
                ret_text_list = [];
                for (ret_key in counts) {
                    ret_text_list.push(counts[ret_key] + ' ' + ret_key);
                }
                attachment.text = 'State status: ' + ret_text_list.join(' / ');
                attachment.fallback = attachment.text;

                if (output.length) {
                    attachment.text += '\n' + output.join('\n');
                }

                attachment.mrkdwn_in = ['text'];
            }
            else {
                attachment.pretext = 'Ran ' + data.fun + ' on ' + data.id;
                attachment.text = JSON.stringify(data['return'], null, 2);
            }

            robot.emit(
                'slack.attachment',
                {
                    attachments: [attachment],
                    channel: 'ops'
                }
            );
        } catch (error) {
            console.log(error);
        }
        res.send('OK');
    });
};
