function onUserlistEnd(event) {
        var channel;
        channel = this.panels.getByName(event.channel);

        // If we didn't find a channel for this, may aswell leave
        if (!channel) return;

        // Update the members list with the new list
        channel.get('members').reset(channel.temp_userlist || []);

        // Clear the temporary userlist
        delete channel.temp_userlist;
    }