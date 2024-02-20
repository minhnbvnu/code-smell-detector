function onErroneusNickname(event) {
    this.irc_connection.clientEvent('irc_error', {
        error: 'erroneus_nickname',
        nick: event.nick,
        reason: event.reason
    });
}