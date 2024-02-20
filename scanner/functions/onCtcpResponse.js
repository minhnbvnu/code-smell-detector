function onCtcpResponse(event) {
    this.irc_connection.clientEvent('ctcp_response', {
        nick: event.nick,
        ident: event.ident,
        hostname: event.hostname,
        target: event.target,
        msg: event.msg,
        time: event.time
    });
}