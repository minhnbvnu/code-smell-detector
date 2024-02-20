function onWasNoSuchNick(event) {
    this.irc_connection.clientEvent('whowas', {
        nick: event.nick,
        end: false
    });
}