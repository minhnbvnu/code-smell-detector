function onChannelInfo(event) {
    // Channel info event may contain 1 of several types of info,
    // including creation time, modes. So just pipe the event
    // right through to the client
    this.irc_connection.clientEvent('channel_info', event);
}