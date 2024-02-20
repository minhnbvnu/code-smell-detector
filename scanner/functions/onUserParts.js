function onUserParts(event) {
    // Only deal with ourselves leaving a channel
    if (event.nick !== this.nick) {
        return;
    }

    if (this.irc_channels[event.channel]) {
        this.irc_channels[event.channel].dispose();
        delete this.irc_channels[event.channel];
    }
}