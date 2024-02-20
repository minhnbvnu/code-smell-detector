function queryCommand (ev) {
        var destination, message, panel;

        destination = ev.params[0];
        ev.params.shift();

        message = ev.params.join(' ');

        // Check if we have the panel already. If not, create it
        panel = this.app.connections.active_connection.panels.getByName(destination);
        if (!panel) {
            panel = new _kiwi.model.Query({name: destination, network: this.app.connections.active_connection});
            this.app.connections.active_connection.panels.add(panel);
        }

        if (panel) panel.view.show();

        if (message) {
            this.app.connections.active_connection.gateway.msg(panel.get('name'), message);
            panel.addMsg(this.app.connections.active_connection.get('nick'), styleText('privmsg', {text: message}), 'privmsg');
        }

    }