function kickCommand (ev) {
        var nick, panel = this.app.panels().active;

        if (!panel.isChannel()) return;

        // Make sure we have a nick
        if (ev.params.length === 0) return;

        nick = ev.params[0];
        ev.params.shift();

        this.app.connections.active_connection.gateway.kick(panel.get('name'), nick, ev.params.join(' '));
    }