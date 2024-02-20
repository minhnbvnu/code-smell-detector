function quoteCommand (ev) {
        var raw = ev.params.join(' ');
        this.app.connections.active_connection.gateway.raw(raw);
    }