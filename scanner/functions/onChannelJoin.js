function onChannelJoin(event) {
    var chan;

    // Only deal with ourselves joining a channel
    if (event.nick !== this.nick) {
        return;
    }

    // We should only ever get a JOIN command for a channel
    // we're not already a member of.. but check we don't
    // have this channel in case something went wrong somewhere
    // at an earlier point
    if (!this.irc_channels[event.channel]) {
        chan = new IrcChannel(this, event.channel);
        this.irc_channels[event.channel] = chan;
        chan.irc_events.join.call(chan, event);
    }
}