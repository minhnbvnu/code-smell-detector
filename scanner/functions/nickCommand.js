function nickCommand (ev) {
        this.app.connections.active_connection.gateway.changeNick(ev.params[0]);
    }