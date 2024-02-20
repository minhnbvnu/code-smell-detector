function onMode(event) {
    this.irc_connection.clientEvent('mode', {
        target: event.target,
        nick: event.nick,
        modes: event.modes,
        time: event.time
    });
}