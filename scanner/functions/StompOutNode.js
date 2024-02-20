function StompOutNode(n) {
        RED.nodes.createNode(this,n);
        /** @type { StompOutNode } */
        const node = this;
        node.server = n.server;
        /** @type { StompServerNode } */
        node.serverConnection = RED.nodes.getNode(node.server);
        node.topic = n.topic;

        if (node.serverConnection) {
            setStatusDisconnected(node);

            node.on("input", function(msg, send, done) {
                const topic = node.topic || msg.topic;
                if (topic.length > 0 && msg.payload) {
                    try {
                        msg.payload = JSON.stringify(msg.payload);
                    } catch {
                        msg.payload = `${msg.payload}`;
                    }
                    node.serverConnection.publish(topic, msg.payload, msg.headers || {});
                } else if (!topic.length > 0) {
                    node.warn('No valid publish topic');

                } else {
                    node.warn('Payload or topic is undefined/null')
                }
                done();
            });

            node.serverConnection.register(node);
            if (node.serverConnection.connected) {
                setStatusConnected(node);
            }
        } else {
            node.error("Missing server config");
        }

        node.on("close", function(removed, done) {
            if (node.serverConnection) {
                node.serverConnection.deregister(node, true, done);
                node.serverConnection = null;
            } else {
                done();
            }
        });
    }