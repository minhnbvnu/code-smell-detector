function onNotOnChannel(event) {
    this.irc_connection.clientEvent('irc_error', {
        error: 'not_on_channel',
        channel: event.channel,
        reason: event.reason
    });
}