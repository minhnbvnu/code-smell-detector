function msgCommand (ev) {
        var message,
            destination = ev.params[0],
            panel = this.app.connections.active_connection.panels.getByName(destination) || this.app.panels().server;

        ev.params.shift();
        message = ev.params.join(' ');

        panel.addMsg(this.app.connections.active_connection.get('nick'), styleText('privmsg', {text: message}), 'privmsg');
        this.app.connections.active_connection.gateway.msg(destination, message);
    }