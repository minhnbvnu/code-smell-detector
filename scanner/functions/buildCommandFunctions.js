function buildCommandFunctions() {
        var fn_to_bind = {
            'unknown_command':     unknownCommand,
            'command':             allCommands,
            'command:msg':         {fn: msgCommand, description: translateText('command_description_msg')},
            'command:action':      {fn: actionCommand, description: translateText('command_description_action'), aliases: ['me']},
            'command:join':        {fn: joinCommand, description: translateText('command_description_join'), aliases: ['j']},
            'command:part':        {fn: partCommand, description: translateText('command_description_part'), aliases: ['p']},
            'command:cycle':       {fn: cycleCommand, description: translateText('command_description_cycle')},
            'command:nick':        {fn: nickCommand, description: translateText('command_description_nick')},
            'command:query':       {fn: queryCommand, description: translateText('command_description_query')},
            'command:invite':      {fn: inviteCommand, description: translateText('command_description_invite')},
            'command:topic':       {fn: topicCommand, description: translateText('command_description_topic')},
            'command:notice':      {fn: noticeCommand, description: translateText('command_description_notice')},
            'command:quote':       {fn: quoteCommand, description: translateText('command_description_quote'), aliases: ['raw']},
            'command:kick':        {fn: kickCommand, description: translateText('command_description_kick')},
            'command:names':       {fn: namesCommand, description: ''},
            'command:mode':        {fn: modeCommand, description: ''},
            'command:clear':       {fn: clearCommand, description: translateText('command_description_clear')},
            'command:ctcp':        {fn: ctcpCommand, description: translateText('command_description_ctcp')},
            'command:quit':        {fn: quitCommand, description: translateText('command_description_quit'), aliases: ['q']},
            'command:server':      {fn: serverCommand, description: translateText('command_description_server')},
            'command:whois':       {fn: whoisCommand, description: translateText('command_description_whois'), aliases: ['w']},
            'command:whowas':      {fn: whowasCommand, description: translateText('command_description_whowas')},
            'command:away':        {fn: awayCommand, description: translateText('command_description_away')},
            'command:encoding':    {fn: encodingCommand, description: translateText('command_description_encoding')},
            'command:channel':     {fn: channelCommand, description: ''},
            'command:applet':      {fn: appletCommand, description: ''},
            'command:settings':    {fn: settingsCommand, description: translateText('command_description_settings')},
            'command:script':      {fn: scriptCommand, description: translateText('command_description_script')}
        };


        fn_to_bind['command:css'] = {
            description: translateText('command_description_css'),
            fn: function(ev) {
                this.app.view.reloadStyles();
            }
        };


        fn_to_bind['command:js'] = {
            description: translateText('command_description_js'),
            fn: function(ev) {
                if (!ev.params[0]) return;
                $script(ev.params[0] + '?' + (new Date().getTime()));
            }
        };


        fn_to_bind['command:set'] = {
            description: translateText('command_description_set'),
            fn: function(ev) {
                if (!ev.params[0]) return;

                var setting = ev.params[0],
                    value;

                // Do we have a second param to set a value?
                if (ev.params[1]) {
                    ev.params.shift();

                    value = ev.params.join(' ');

                    // If we're setting a true boolean value..
                    if (value === 'true')
                        value = true;

                    // If we're setting a false boolean value..
                    if (value === 'false')
                        value = false;

                    // If we're setting a number..
                    if (parseInt(value, 10).toString() === value)
                        value = parseInt(value, 10);

                    _kiwi.global.settings.set(setting, value);
                }

                // Read the value to the user
                this.app.panels().active.addMsg('', styleText('set_setting', {text: setting + ' = ' + _kiwi.global.settings.get(setting).toString()}));
            }
        };


        fn_to_bind['command:save'] = {
            description: translateText('command_description_save'),
            fn: function(ev) {
                _kiwi.global.settings.save();
                this.app.panels().active.addMsg('', styleText('settings_saved', {text: translateText('client_models_application_settings_saved')}));
            }
        };


        fn_to_bind['command:alias'] = {
            description: translateText('command_description_alias'),
            fn: function(ev) {
                var that = this,
                    name, rule;

                // No parameters passed so list them
                if (!ev.params[1]) {
                    $.each(this.controlbox.preprocessor.aliases, function (name, rule) {
                        that.app.panels().server.addMsg(' ', styleText('list_aliases', {text: name + '   =>   ' + rule}));
                    });
                    return;
                }

                // Deleting an alias?
                if (ev.params[0] === 'del' || ev.params[0] === 'delete') {
                    name = ev.params[1];
                    if (name[0] !== '/') name = '/' + name;
                    delete this.controlbox.preprocessor.aliases[name];
                    return;
                }

                // Add the alias
                name = ev.params[0];
                ev.params.shift();
                rule = ev.params.join(' ');

                // Make sure the name starts with a slash
                if (name[0] !== '/') name = '/' + name;

                // Now actually add the alias
                this.controlbox.preprocessor.aliases[name] = rule;
            }
        };


        fn_to_bind['command:ignore'] = {
            description: translateText('command_description_ignore'),
            fn: function(ev) {
                var that = this,
                    ignore_list = this.app.connections.active_connection.ignore_list,
                    user_mask;

                // No parameters passed so list them
                if (!ev.params[0]) {
                    if (ignore_list.length > 0) {
                        this.app.panels().active.addMsg(' ', styleText('ignore_title', {text: translateText('client_models_application_ignore_title')}));
                        ignore_list.forEach(function(ignored) {
                            that.app.panels().active.addMsg(' ', styleText('ignored_pattern', {text: ignored.get('mask')}));
                        });
                    } else {
                        this.app.panels().active.addMsg(' ', styleText('ignore_none', {text: translateText('client_models_application_ignore_none')}));
                    }
                    return;
                }

                // We have a parameter, so add it, first convert it to a full mask.
                user_mask = toUserMask(ev.params[0]);
                ignore_list.addMask(user_mask);

                this.app.panels().active.addMsg(' ', styleText('ignore_nick', {text: translateText('client_models_application_ignore_nick', [user_mask])}));
            }
        };


        fn_to_bind['command:unignore'] = {
            description: translateText('command_description_unignore'),
            fn: function(ev) {
                var ignore_list = this.app.connections.active_connection.ignore_list,
                    user_mask, matches;

                if (!ev.params[0]) {
                    this.app.panels().active.addMsg(' ', styleText('ignore_stop_notice', {text: translateText('client_models_application_ignore_stop_notice')}));
                    return;
                }

                user_mask = toUserMask(ev.params[0]);
                matches = ignore_list.where({mask: user_mask});
                if (matches) {
                    ignore_list.remove(matches);
                }

                this.app.panels().active.addMsg(' ', styleText('ignore_stopped', {text: translateText('client_models_application_ignore_stopped', [user_mask])}));
            }
        };


        return fn_to_bind;
    }