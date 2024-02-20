function onUserlist(event) {
        var that = this,
            channel = this.panels.getByName(event.channel);

        // If we didn't find a channel for this, may aswell leave
        if (!channel) return;

        channel.temp_userlist = channel.temp_userlist || [];
        _.each(event.users, function (item) {
            var user = new _kiwi.model.Member({
                nick: item.nick,
                modes: item.modes,
                user_prefixes: that.get('user_prefixes')
            });
            channel.temp_userlist.push(user);
        });
    }