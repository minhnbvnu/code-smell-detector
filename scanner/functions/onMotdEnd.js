function onMotdEnd(event) {
    this.irc_connection.clientEvent('motd', {
        msg: this.motd_buffer
    });
}