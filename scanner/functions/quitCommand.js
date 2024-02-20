function quitCommand (ev) {
        var network = this.app.connections.active_connection;

        if (!network)
            return;

        network.gateway.quit(ev.params.join(' '));
    }