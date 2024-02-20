function onPart(event) {
    var that = this;

    global.modules.emit('irc channel part', {
        channel: this,
        connection: this.irc_connection,
        irc_event: event
    })
    .then(function() {
        that.irc_connection.clientEvent('channel', {
            type: 'part',
            nick: event.nick,
            ident: event.ident,
            hostname: event.hostname,
            channel: that.name,
            message: event.message,
            time: event.time
        });
    });
}