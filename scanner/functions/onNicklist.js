function onNicklist(event) {
    this.irc_connection.clientEvent('userlist', {
        users: event.users,
        channel: this.name
    });
    // TODO: uncomment when using an IrcUser per nick
    //updateUsersList.call(this, event.users);
}