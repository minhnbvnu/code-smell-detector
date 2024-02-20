function onUnknownCommand(event) {
    this.irc_connection.clientEvent('unknown_command', {
        error: 'unknown_command',
        command: event.command,
        params: event.params
    });
}