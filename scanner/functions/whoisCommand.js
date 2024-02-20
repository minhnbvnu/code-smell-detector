function whoisCommand (ev) {
        var nick;

        if (ev.params[0]) {
            nick = ev.params[0];
        } else if (this.app.panels().active.isQuery()) {
            nick = this.app.panels().active.get('name');
        }

        if (nick)
            this.app.connections.active_connection.gateway.raw('WHOIS ' + nick + ' ' + nick);
    }