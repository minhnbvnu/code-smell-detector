function onNotice(event) {
    var that = this;
    global.modules.emit('irc user notice', {
        connection: this.irc_connection,
        irc_event: event
    })
    .then(function() {
        that.irc_connection.clientEvent('message', {
            type: 'notice',
            from_server: event.from_server,
            nick: event.nick,
            ident: event.ident,
            hostname: event.hostname,
            target: event.target,
            group: event.group,
            msg: event.msg,
            time: event.time
        });
    });
}