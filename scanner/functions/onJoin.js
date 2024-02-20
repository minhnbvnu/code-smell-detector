function onJoin(event) {
    var that = this;

    global.modules.emit('irc channel join', {
        channel: this,
        connection: this.irc_connection,
        irc_event: event
    })
    .then(function() {
        that.irc_connection.clientEvent('channel', {
            type: 'join',
            channel: that.name,
            nick: event.nick,
            ident: event.ident,
            hostname: event.hostname,
            time: event.time
        });
    });
}