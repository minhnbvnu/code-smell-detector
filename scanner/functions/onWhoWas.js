function onWhoWas(event) {
    this.irc_connection.clientEvent('whowas', {
        nick: event.nick,
        ident: event.ident,
        hostname: event.host,
        real_name: event.real_name,
        end: false
    });
}