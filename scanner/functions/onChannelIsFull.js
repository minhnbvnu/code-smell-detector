function onChannelIsFull(event) {
    this.irc_connection.clientEvent('irc_error', {
        error: 'channel_is_full',
        channel: event.channel,
        reason: event.reason
    });
}