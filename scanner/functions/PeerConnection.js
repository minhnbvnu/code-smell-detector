function PeerConnection(config, constraints) {
                    this.pc = new webrtc.PeerConnection(config, constraints);
                    WildEmitter.call(this);
                    this.pc.onicecandidate = this._onIce.bind(this);
                    this.pc.onaddstream = this._onAddStream.bind(this);
                    this.pc.onremovestream = this._onRemoveStream.bind(this);

                    if (config.debug) {
                        this.on('*', function(eventName, event) {
                            console.log('PeerConnection event:', eventName, event);
                        });
                    }
                }