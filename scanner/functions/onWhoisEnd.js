function onWhoisEnd(event) {
    this.irc_connection.clientEvent('whois', {
        nick: event.nick,
        msg: event.msg,
        end: true
    });
}