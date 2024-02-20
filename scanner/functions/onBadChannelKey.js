function onBadChannelKey(event) {
    this.irc_connection.clientEvent('irc_error', {
        error: 'bad_channel_key',
        channel: event.channel,
        reason: event.reason
    });
}