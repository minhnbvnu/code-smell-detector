function ctcpCommand(ev) {
        var target, type;

        // Make sure we have a target and a ctcp type (eg. version, time)
        if (ev.params.length < 2) return;

        target = ev.params[0];
        ev.params.shift();

        type = ev.params[0];
        ev.params.shift();

        this.app.connections.active_connection.gateway.ctcpRequest(type, target, ev.params.join(' '));
    }