function cycleCommand (ev) {
        var that = this,
            chan_name;

        if (ev.params.length === 0) {
            chan_name = this.app.panels().active.get('name');
        } else {
            chan_name = ev.params[0];
        }

        this.app.connections.active_connection.gateway.part(chan_name);

        // Wait for a second to give the network time to register the part command
        setTimeout(function() {
            // Use createAndJoinChannels() here as it auto-creates panels instead of waiting for the network
            that.app.connections.active_connection.createAndJoinChannels(chan_name);
            that.app.connections.active_connection.panels.getByName(chan_name).show();
        }, 1000);
    }