function onUserKick(event){
    // Only deal with ourselves being kicked from a channel
    if (event.kicked !== this.nick) {
        return;
    }

    if (this.irc_channels[event.channel]) {
        this.irc_channels[event.channel].dispose();
        delete this.irc_channels[event.channel];
    }

}