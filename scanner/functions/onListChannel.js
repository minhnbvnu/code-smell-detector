function onListChannel(event) {
    var buf;
    if (!this.busy_listing) {
      onListStart.call(this);
    }
    this.list_buffer.push({
        channel: event.channel,
        num_users: event.num_users,
        topic: event.topic
    });

    if (this.list_buffer.length > 200) {
        buf = _.sortBy(this.list_buffer, function (channel) {
            // sortBy sorts in ascending order, we want to sort by descending, hence using 0 - num_users.
            return 0 - channel.num_users;
        });
        this.irc_connection.clientEvent('list_channel', {
            chans: buf
        });
        this.list_buffer = [];
    }
}