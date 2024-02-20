function onWhoisUser(event) {
    this.irc_connection.clientEvent('whois', {
        nick: event.nick,
        ident: event.ident,
        hostname: event.host,
        msg: event.msg,
        end: false
    });
}