function TCPTracker() {
    this.sessions = {};
    EventEmitter.call(this);
}