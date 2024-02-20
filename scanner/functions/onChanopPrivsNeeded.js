function onChanopPrivsNeeded(event) {
    this.irc_connection.clientEvent('irc_error', {
        error: 'chanop_privs_needed',
        channel: event.channel,
        reason: event.reason
    });
}