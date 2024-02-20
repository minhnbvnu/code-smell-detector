function onUserPrivmsg(event) {
    var user;

    // Only deal with messages targetted to us
    if (event.channel !== this.nick) {
        return;
    }

    if (!this.irc_users[event.nick]) {
        user = new IrcUser(this, event.nick);
        this.irc_users[event.nick] = user;
        user.irc_events.privmsg.call(user, event);
    }
}