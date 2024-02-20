function onWhoisSecure(event) {
    this.irc_connection.clientEvent('whois', {
        nick: event.nick,
        msg: 'Using a secure connection',
        end: false
    });
}