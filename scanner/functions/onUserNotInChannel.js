function onUserNotInChannel(event) {
    this.irc_connection.clientEvent('irc_error', {
        error: 'user_not_in_channel',
        nick: event.nick,
        channel: event.channel,
        reason: event.reason
    });
}