function onInviteOnlyChannel(event) {
    this.irc_connection.clientEvent('irc_error', {
        error: 'invite_only_channel',
        channel: event.channel,
        reason: event.reason
    });
}