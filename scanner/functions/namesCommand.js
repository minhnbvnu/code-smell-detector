function namesCommand (ev) {
        var channel, panel = this.app.panels().active;

        if (!panel.isChannel()) return;

        // Make sure we have a channel
        channel = ev.params.length === 0 ?
            panel.get('name') :
            ev.params[0];

        this.app.connections.active_connection.gateway.raw('NAMES ' + channel);
    }