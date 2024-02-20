function websocketDisconnect() {
    winston.debug('(client ' + this.id + ') Disconnected');

    this.emit('disconnect');
    this.dispose();
}