function deconstructPacket(packet) {
        var buffers = [];
        var packetData = packet.data;
        var pack = packet;
        pack.data = _deconstructPacket(packetData, buffers);
        pack.attachments = buffers.length; // number of binary 'attachments'

        return {
            packet: pack,
            buffers: buffers,
        };
    }