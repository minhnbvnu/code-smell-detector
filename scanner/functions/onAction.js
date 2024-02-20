function onAction(event) {
    var that = this;

    global.modules.emit('irc action', {
        connection: this.irc_connection,
        irc_event: event
    })
    .then(function() {
        that.irc_connection.clientEvent('message', {
            type: 'action',
            nick: event.nick,
            ident: event.ident,
            hostname: event.hostname,
            target: event.target,
            msg: event.msg,
            time: event.time
        });
    });
}