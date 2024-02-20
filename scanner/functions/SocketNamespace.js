function SocketNamespace(socket, name) {
            this.socket = socket;
            this.name = name || '';
            this.flags = {};
            this.json = new Flag(this, 'json');
            this.ackPackets = 0;
            this.acks = {};
        }