function onTopicSetBy(event) {
    this.irc_connection.clientEvent('topicsetby', {
        nick: event.nick,
        channel: event.channel,
        when: event.when
    });
}