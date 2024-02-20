function updateUsersList(users) {
    var that = this;
    if (users) {
        users.forEach(function (user) {
            if (!that.irc_connection.irc_users[user.nick]) {
                that.irc_connection.irc_users[user.nick] = new IrcUser(that.irc_connection, user.nick);
            }
        });
    }
}