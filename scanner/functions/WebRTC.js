function WebRTC(opts) {
    var self = this,
        options = opts || {},
        config = this.config = {
            url: 'http://signaling.simplewebrtc.com:8888',
            log: false,
            localVideoEl: '',
            remoteVideosEl: '',
            autoRequestMedia: false,
            autoRemoveVideos: true,
            // makes the entire PC config overridable
            peerConnectionConfig: {
                iceServers: webrtc.prefix == 'moz' ? [{
                    "url": "stun:124.124.124.2"
                }] : [{
                    "url": "stun:stun.l.google.com:19302"
                }]
            },
            peerConnectionContraints: {
                optional: [{
                    "DtlsSrtpKeyAgreement": true
                }]
            },
            media: {
                audio: true,
                video: true
            }
        },
        item,
        connection;

    // check for support
    if (!webrtc.support) {
        console.error('Your browser doesn\'t seem to support WebRTC');
    }

    // expose screensharing check
    this.screenSharingSupport = webrtc.screenSharing;

    // set options
    for (item in options) {
        this.config[item] = options[item];
    }

    // log if configured to
    log = (this.config.log) ? console.log.bind(console) : function() {};

    // where we'll store our peer connections
    this.peers = [];

    // our socket.io connection
    connection = this.connection = io.connect(this.config.url);

    connection.on('connect', function() {
        self.emit('ready', connection.socket.sessionid);
        self.sessionReady = true;
        self.testReadiness();
    });

    connection.on('message', function(message) {
        var peers = self.getPeers(message.from, message.roomType),
            peer;

        if (message.type === 'offer') {
            peer = self.createPeer({
                id: message.from,
                type: message.roomType,
                sharemyscreen: message.roomType === 'screen' && !message.broadcaster
            });
            peer.handleMessage(message);
        } else if (peers.length) {
            peers.forEach(function(peer) {
                peer.handleMessage(message);
            });
        }
    });

    connection.on('remove', function(room) {
        if (room.id !== self.connection.socket.sessionid) {
            self.removeForPeerSession(room.id, room.type);
        }
    });

    WildEmitter.call(this);

    // log events
    if (this.config.log) {
        this.on('*', function(event, val1, val2) {
            log('event:', event, val1, val2);
        });
    }

    // auto request if configured
    if (this.config.autoRequestMedia) this.startLocalVideo();
}