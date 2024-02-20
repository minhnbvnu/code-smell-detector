function onCannotSendToChan(event) {
    this.irc_connection.clientEvent('irc_error', {
        error: 'cannot_send_to_channel',
        channel: event.channel,
        reason: event.reason
    });
}