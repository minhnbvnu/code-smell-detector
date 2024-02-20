function onNicknameInUse(event) {
    this.irc_connection.clientEvent('irc_error', {
        error: 'nickname_in_use',
        nick: event.nick,
        reason: event.reason
    });
}