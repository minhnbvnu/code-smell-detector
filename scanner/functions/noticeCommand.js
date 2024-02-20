function noticeCommand (ev) {
        var destination;

        // Make sure we have a destination and some sort of message
        if (ev.params.length <= 1) return;

        destination = ev.params[0];
        ev.params.shift();

        this.app.connections.active_connection.gateway.notice(destination, ev.params.join(' '));
    }