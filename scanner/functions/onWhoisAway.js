function onWhoisAway(event) {
    this.irc_connection.clientEvent('whois', {
        nick: event.nick,
        away_reason: event.reason,
        end: false
    });
}