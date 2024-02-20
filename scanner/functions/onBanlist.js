function onBanlist(event) {
        var channel = this.panels.getByName(event.channel);
        if (!channel)
            return;

        channel.set('banlist', event.bans || []);
    }