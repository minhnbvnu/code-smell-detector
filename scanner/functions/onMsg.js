function onMsg(event) {
    var that = this;

    global.modules.emit('irc message', {
        channel: this,
        connection: this.irc_connection,
        irc_event: event
    })
    .then(function() {
        that.irc_connection.clientEvent('message', {
            type: 'message',
            nick: event.nick,
            ident: event.ident,
            hostname: event.hostname,
            target: that.name,
            msg: event.msg,
            time: event.time
        });
    });
}