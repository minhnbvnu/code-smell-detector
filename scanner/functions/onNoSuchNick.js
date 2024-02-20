function onNoSuchNick(event) {
    this.irc_connection.clientEvent('irc_error', {
        error: 'no_such_nick',
        nick: event.nick,
        reason: event.reason
    });
}