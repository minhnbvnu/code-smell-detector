function onNick(event) {
    this.irc_connection.clientEvent('nick', {
        nick: event.nick,
        ident: event.ident,
        hostname: event.hostname,
        newnick: event.newnick,
        time: event.time
    });

    // TODO: uncomment when using an IrcUser per nick
    //EventBinder.unbindIrcEvents('user ' + this.nick, this.irc_events, irc_connection);
    //this.nick = event.newnick;
    //EventBinder.bindIrcEvents('user ' + this.nick, this.irc_events, this, irc_connection);
}