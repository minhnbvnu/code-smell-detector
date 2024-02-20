function onListEnd(event) {
    var buf;

    buf = _.sortBy(this.list_buffer, function (channel) {
        // sortBy sorts in ascending order, we want to sort by descending, hence using 0 - num_users.
        return 0 - channel.num_users;
    });
    this.irc_connection.clientEvent('list_channel', {
        chans: buf
    });
    this.list_buffer = [];
    this.busy_listing = false;

    this.irc_connection.clientEvent('list_end', {});
}