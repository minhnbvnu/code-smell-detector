function onWhoisServer(event) {
    this.irc_connection.clientEvent('whois', {
        nick: event.nick,
        irc_server: event.irc_server,
        server_info: event.server_info,
        end: false
    });
}