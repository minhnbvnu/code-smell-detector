function partCommand (ev) {
        var that = this,
            chans,
            msg;
        if (ev.params.length === 0) {
            this.app.connections.active_connection.gateway.part(this.app.panels().active.get('name'));
        } else {
            chans = ev.params[0].split(',');
            msg = ev.params.slice(1).join(' ');
            _.each(chans, function (channel) {
                that.app.connections.active_connection.gateway.part(channel, msg);
            });
        }
    }