function onTooManyChannels(event) {
    this.irc_connection.clientEvent('irc_error', {
        error: 'too_many_channels',
        channel: event.channel,
        reason: event.reason
    });
}