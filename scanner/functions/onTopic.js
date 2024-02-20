function onTopic(event) {
    var that = this;

    global.modules.emit('irc channel topic', {
        channel: this,
        connection: this.irc_connection,
        irc_event: event
    })
    .then(function() {
        that.irc_connection.clientEvent('topic', {
            nick: event.nick,
            channel: that.name,
            topic: event.topic,
            time: event.time
        });
    });
}