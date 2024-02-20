function topicCommand (ev) {
        var channel_name;

        if (ev.params.length === 0) return;

        if (this.app.connections.active_connection.isChannelName(ev.params[0])) {
            channel_name = ev.params[0];
            ev.params.shift();
        } else {
            channel_name = this.app.panels().active.get('name');
        }

        this.app.connections.active_connection.gateway.topic(channel_name, ev.params.join(' '));
    }