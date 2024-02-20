function onListStart(event) {
    this.irc_connection.clientEvent('list_start', {});
    this.list_buffer = [];
    this.busy_listing = true;
}