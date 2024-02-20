function Peer(options) {
    var self = this;

    this.id = options.id;
    this.parent = options.parent;
    this.type = options.type || 'video';
    this.oneway = options.oneway || false;
    this.sharemyscreen = options.sharemyscreen || false;
    this.stream = options.stream;
    // Create an RTCPeerConnection via the polyfill
    this.pc = new PeerConnection(this.parent.config.peerConnectionConfig, this.parent.config.peerConnectionContraints);
    this.pc.on('ice', this.onIceCandidate.bind(this));
    if (options.type === 'screen') {
        if (this.parent.localScreen && this.sharemyscreen) {
            log('adding local screen stream to peer connection');
            this.pc.addStream(this.parent.localScreen);
            this.broadcaster = this.parent.connection.socket.sessionid;
        }
    } else {
        this.pc.addStream(this.parent.localStream);
    }
    this.pc.on('addStream', this.handleRemoteStreamAdded.bind(this));
    this.pc.on('removeStream', this.handleStreamRemoved.bind(this));
    WildEmitter.call(this);

    // proxy events to parent
    this.on('*', function(name, value) {
        self.parent.emit(name, value, self);
    });
}