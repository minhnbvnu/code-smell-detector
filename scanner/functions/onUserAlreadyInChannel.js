function onUserAlreadyInChannel(event) {
    this.irc_connection.clientEvent('irc_error', {
        error: 'user_on_channel',
        channel: event.channel,
        nick: event.nick
    });
}