function onWhoisAccount(event) {
    this.irc_connection.clientEvent('whois', {
        nick: event.nick,
        msg: 'Logged in as ' + event.account,
        end: false
    });
}