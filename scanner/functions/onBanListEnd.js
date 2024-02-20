function onBanListEnd(event) {
    this.irc_connection.clientEvent('banlist', {
        channel: this.name,
        bans: this.ban_list_buffer
    });

    this.ban_list_buffer = [];
}