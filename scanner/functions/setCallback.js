function setCallback(node) {
                node.port.on('data', function (msgout, sender) {
                    // serial request will only process incoming data pertaining to its own request (i.e. when it's at the head of the queue)
                    if (sender !== node) { return; }
                    node.status({ fill: "green", shape: "dot", text: "node-red:common.status.ok" });
                    msgout.status = "OK";
                    node.send(msgout);
                });
                node.port.on('timeout', function (msgout, sender) {
                    if (sender !== node) { return; }
                    msgout.status = "ERR_TIMEOUT";
                    node.status({ fill: "red", shape: "ring", text: "serial.status.timeout" });
                    node.send(msgout);
                });
                node.port.on('ready', function () {
                    node.status({ fill: "green", shape: "dot", text: "node-red:common.status.connected" });
                });
                node.port.on('closed', function () {
                    node.status({ fill: "red", shape: "ring", text: "node-red:common.status.not-connected" });
                });
                node.port.on('stopped', function() {
                    node.status({fill:"grey",shape:"ring",text:"serial.status.stopped"});
                });
            }