function onUserNick(event) {
    // Only deal with messages targetted to us
    if (event.nick !== this.nick) {
        return;
    }

    this.nick = event.newnick;
}