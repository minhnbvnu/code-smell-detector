function onBannedFromChannel(event) {
    this.irc_connection.clientEvent('irc_error', {
        error: 'banned_from_channel',
        channel: event.channel,
        reason: event.reason
    });
}