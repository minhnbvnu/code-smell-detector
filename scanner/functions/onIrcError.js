function onIrcError(event) {
        var panel, tmp;

        if (event.channel !== undefined && !(panel = this.panels.getByName(event.channel))) {
            panel = this.panels.server;
        }

        switch (event.error) {
        case 'banned_from_channel':
            panel.addMsg(' ', styleText('channel_banned', {nick: event.nick, text: translateText('client_models_network_banned', [event.channel, event.reason]), channel: event.channel}), 'status');
            _kiwi.app.message.text(_kiwi.global.i18n.translate('client_models_network_banned').fetch(event.channel, event.reason));
            break;
        case 'bad_channel_key':
            panel.addMsg(' ', styleText('channel_badkey', {nick: event.nick, text: translateText('client_models_network_channel_badkey', [event.channel]), channel: event.channel}), 'status');
            _kiwi.app.message.text(_kiwi.global.i18n.translate('client_models_network_channel_badkey').fetch(event.channel));
            break;
        case 'invite_only_channel':
            panel.addMsg(' ', styleText('channel_inviteonly', {nick: event.nick, text: translateText('client_models_network_channel_inviteonly', [event.nick, event.channel]), channel: event.channel}), 'status');
            _kiwi.app.message.text(event.channel + ' ' + _kiwi.global.i18n.translate('client_models_network_channel_inviteonly').fetch());
            break;
        case 'user_on_channel':
            panel.addMsg(' ', styleText('channel_alreadyin', {nick: event.nick, text: translateText('client_models_network_channel_alreadyin'), channel: event.channel}));
            break;
        case 'channel_is_full':
            panel.addMsg(' ', styleText('channel_limitreached', {nick: event.nick, text: translateText('client_models_network_channel_limitreached', [event.channel]), channel: event.channel}), 'status');
            _kiwi.app.message.text(event.channel + ' ' + _kiwi.global.i18n.translate('client_models_network_channel_limitreached').fetch(event.channel));
            break;
        case 'chanop_privs_needed':
            panel.addMsg(' ', styleText('chanop_privs_needed', {text: event.reason, channel: event.channel}), 'status');
            _kiwi.app.message.text(event.reason + ' (' + event.channel + ')');
            break;
        case 'cannot_send_to_channel':
            panel.addMsg(' ', '== ' + event.reason, 'status');
            break;
        case 'no_such_nick':
            tmp = this.panels.getByName(event.nick);
            if (tmp) {
                tmp.addMsg(' ', styleText('no_such_nick', {nick: event.nick, text: event.reason, channel: event.channel}), 'status');
            } else {
                this.panels.server.addMsg(' ', styleText('no_such_nick', {nick: event.nick, text: event.reason, channel: event.channel}), 'status');
            }
            break;
        case 'nickname_in_use':
            this.panels.server.addMsg(' ', styleText('nickname_alreadyinuse', {nick: event.nick, text: translateText('client_models_network_nickname_alreadyinuse', [event.nick]), channel: event.channel}), 'status');
            if (this.panels.server !== this.panels.active) {
                _kiwi.app.message.text(_kiwi.global.i18n.translate('client_models_network_nickname_alreadyinuse').fetch(event.nick));
            }

            // Only show the nickchange component if the controlbox is open
            if (_kiwi.app.controlbox.$el.css('display') !== 'none') {
                (new _kiwi.view.NickChangeBox()).render();
            }

            break;

        case 'password_mismatch':
            this.panels.server.addMsg(' ', styleText('channel_badpassword', {nick: event.nick, text: translateText('client_models_network_badpassword', []), channel: event.channel}), 'status');
            break;

        case 'error':
            if (event.reason) {
                this.panels.server.addMsg(' ', styleText('general_error', {text: event.reason}), 'status');
            }
            break;

        default:
            // We don't know what data contains, so don't do anything with it.
            //_kiwi.front.tabviews.server.addMsg(null, ' ', '== ' + data, 'status');
        }
    }