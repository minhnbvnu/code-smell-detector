function awayCommand (ev) {
        this.app.connections.active_connection.gateway.raw('AWAY :' + ev.params.join(' '));
    }