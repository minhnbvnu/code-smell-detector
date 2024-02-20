function MQLightOut(n) {
        RED.nodes.createNode(this, n);
        this.topic = n.topic || "";
        this.service = n.service;
        this.serviceConfig = RED.nodes.getNode(this.service);
        var node = this;

        if (node.serviceConfig) {
            if (node.serviceConfig.client) {
                var sendClient = node.serviceConfig.client;
                sendClient.on("error", function(err) {
                    if (err) { node.error(err.toString()); }
                });
                sendClient.on("started", function () {
                    node.on("input", function(msg) {
                        var topic = node.topic;
                        if (topic === "") {
                            if (msg.topic) {
                                topic = msg.topic;
                            }
                            else {
                                node.warn("No topic set in MQ Light out node");
                                return;
                            }
                        }
                        sendClient.send(topic, msg.payload, function(err) {
                            if (err) {
                                node.error(err,msg);
                            }
                        });
                    });
                });
                sendClient.start();

                node.on("close", function (done) {
                    sendClient.stop(done);
                });
            }
        }
    }