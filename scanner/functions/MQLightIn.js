function MQLightIn(n) {
        RED.nodes.createNode(this, n);
        this.topic = n.topic || "";
        this.share = n.share || null;
        this.service = n.service;
        this.serviceConfig = RED.nodes.getNode(this.service);
        var node = this;

        if (node.serviceConfig) {
            if (node.serviceConfig.client) {
                var recvClient = node.serviceConfig.client;
                recvClient.on("error", function(err) {
                    if (err) { node.error(err.toString()); }
                });
                recvClient.on("started", function() {
                    recvClient.on("message", function(data, delivery) {
                        if (node.topic === delivery.destination.topicPattern) {
                            var msg = {
                                topic: delivery.message.topic,
                                payload: data,
                                _session: {
                                    type: "mqlight",
                                    id: recvClient.id
                                }
                            };
                            if (delivery.destination.share) {
                                msg.share = delivery.destination.share;
                            }
                            node.send(msg);
                        }
                    });
                    var subscribeCallback = function(err) {
                        if (err) {
                            node.error("Failed to subscribe: " + err);
                        }
                        else {
                            node.log("Subscribed to "+node.topic+(node.share?" ["+node.share+"]":""));
                        }
                    };
                    if (node.share) {
                        recvClient.subscribe(node.topic, node.share, subscribeCallback);
                    }
                    else {
                        recvClient.subscribe(node.topic, subscribeCallback);
                    }
                });
                recvClient.start();

                node.on("close", function (done) {
                    recvClient.stop(done);
                });
            }

        }
    }