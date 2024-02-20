function inviteCommand (ev) {
        var nick, channel;

        // A nick must be specified
        if (!ev.params[0])
            return;

        // Can only invite into channels
        if (!this.app.panels().active.isChannel())
            return;

        nick = ev.params[0];
        channel = this.app.panels().active.get('name');

        this.app.connections.active_connection.gateway.raw('INVITE ' + nick + ' ' + channel);

        this.app.panels().active.addMsg('', styleText('channel_has_been_invited', {nick: nick, text: translateText('client_models_application_has_been_invited', [channel])}), 'action');
    }