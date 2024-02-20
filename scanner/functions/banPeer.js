function banPeer(peer) {
            peer.peerAddress._protocol = Protocol.DUMB;
            expect(consensus1.network._connections.connectOutbound(peer.peerAddress)).toBe(false);
            peer.peerAddress._protocol = Protocol.RTC;
            expect(consensus1.network._connections.connectOutbound(peer.peerAddress)).toBe(false);
            peer.channel.close(CloseType.INVALID_BLOCK, 'Ban consensus 2');
        }