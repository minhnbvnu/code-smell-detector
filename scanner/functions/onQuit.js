function onQuit(event) {
    this.irc_connection.clientEvent('quit', {
        nick: event.nick,
        ident: event.ident,
        hostname: event.hostname,
        message: event.message,
        time: event.time
    });
}