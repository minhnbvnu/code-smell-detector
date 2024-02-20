function onOptions(event) {
    this.irc_connection.clientEvent('options', {
        options: event.options,
        cap: event.cap
    });
}