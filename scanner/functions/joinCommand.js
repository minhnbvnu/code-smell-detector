function joinCommand (ev) {
        var panels, channel_names;

        channel_names = ev.params.join(' ').split(',');
        panels = this.app.connections.active_connection.createAndJoinChannels(channel_names);

        // Show the last channel if we have one
        if (panels.length)
            panels[panels.length - 1].view.show();
    }