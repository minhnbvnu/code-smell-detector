function channelCommand (ev) {
        var active_panel = this.app.panels().active;

        if (!active_panel.isChannel())
            return;

        new _kiwi.model.ChannelInfo({channel: this.app.panels().active});
    }