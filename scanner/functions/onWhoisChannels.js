function onWhoisChannels(event) {
    this.irc_connection.clientEvent('whois', {
        nick: event.nick,
        chans: event.chans,
        end: false
    });
}