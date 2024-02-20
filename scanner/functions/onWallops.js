function onWallops(event) {
    this.irc_connection.clientEvent('wallops', {
        nick: event.nick,
        ident: event.ident,
        hostname: event.hostname,
        msg: event.msg,
        time: event.time
    });
}