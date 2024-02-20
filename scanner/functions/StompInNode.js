function StompInNode(n) {
        RED.nodes.createNode(this,n);
        /** @type { StompInNode } */
        const node = this;
        node.server = n.server;
        /** @type { StompServerNode } */
        node.serverConnection = RED.nodes.getNode(node.server);
        node.topic = n.topic;
        node.ack = n.ack;

        if (node.serverConnection) {
            setStatusDisconnected(node);

            if (node.topic) {
                node.serverConnection.register(node, function() {
                    node.serverConnection.subscribe(node.topic, node.ack, function(msg) {
                        node.send(msg);
                    });
                });

                if (node.serverConnection.connected) {
                    setStatusConnected(node);
                }
            }
        } else {
            node.error("Missing server config");
        }

        node.on("close", function(removed, done) {
            if (node.serverConnection) {
                node.serverConnection.unsubscribe(node.topic);
                node.serverConnection.deregister(node, true, done);
                node.serverConnection = null;
            } else {
                done();
            }
        });
    }