function tryReconnectPeer(peer) {
            expect(consensus1.network._connections.connectOutbound(peer.peerAddress)).toBe(false);
            consensus2.network.disconnect();
            done();
        }