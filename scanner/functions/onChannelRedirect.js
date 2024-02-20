function onChannelRedirect(event) {
    this.irc_connection.clientEvent('channel_redirect', {
        from: event.from,
        to: event.to
    });
}