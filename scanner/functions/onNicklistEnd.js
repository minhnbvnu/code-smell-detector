function onNicklistEnd(event) {
    this.irc_connection.clientEvent('userlist_end', {
        users: event.users,
        channel: this.name
    });
    // TODO: uncomment when using an IrcUser per nick
    //updateUsersList.call(this, event.users);
}