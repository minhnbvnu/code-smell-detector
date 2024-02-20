function onAway(event) {
    this.irc_connection.clientEvent('away', {
        nick: event.nick,
        msg: event.msg,
        time: event.time
    });
}