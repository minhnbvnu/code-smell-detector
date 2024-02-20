function onKick(event) {
    var that = this;

    global.modules.emit('irc channel kick', {
        channel: this,
        connection: this.irc_connection,
        irc_event: event
    })
    .then(function() {
        that.irc_connection.clientEvent('channel', {
            type: 'kick',
            kicked: event.kicked,  // Nick of the kicked
            nick: event.nick, // Nick of the kicker
            ident: event.ident,
            hostname: event.hostname,
            channel: that.name,
            message: event.message,
            time: event.time
        });
    });
}