function unknownCommand (ev) {
        var raw_cmd = ev.command + ' ' + ev.params.join(' ');
        this.app.connections.active_connection.gateway.raw(raw_cmd);
    }