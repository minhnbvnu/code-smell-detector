function SerialRequestNode(n) {
        RED.nodes.createNode(this,n);
        this.serial = n.serial;
        this.serialConfig = RED.nodes.getNode(this.serial);

        if (this.serialConfig) {
            var node = this;
            node.port = serialPool.get(this.serialConfig);
            // Serial Out
            node.on("input",function(msg) {
                if (msg.hasOwnProperty("baudrate")) {
                    var baud = parseInt(msg.baudrate);
                    if (isNaN(baud)) {
                        node.error(RED._("serial.errors.badbaudrate"),msg);
                    } else {
                        node.port.update({baudRate: baud},function(err,res) {
                            if (err) {
                                var errmsg = err.toString().replace("Serialport","Serialport "+node.port.serial.path);
                                node.error(errmsg,msg);
                            }
                        });
                    }
                }
                if (!msg.hasOwnProperty("payload")) { return; } // do nothing unless we have a payload
                if (msg.hasOwnProperty("count") && (typeof msg.count === "number") && (node.serialConfig.out === "count")) {
                    node.serialConfig.newline = msg.count;
                }
                if (msg.hasOwnProperty("flush") && msg.flush === true) { node.port.serial.flush(); }
                node.status({fill:"yellow",shape:"dot",text:"serial.status.waiting"});
                node.port.enqueue(msg,node,function(err,res) {
                    if (err) {
                        var errmsg = err.toString().replace("Serialport","Serialport "+node.port.serial.path);
                        node.error(errmsg,msg);
                    }
                });
            });

            let serialConfig = this.serialConfig;
            serialConfig.on('start', function() {
                node.port = serialPool.get(serialConfig);
                setCallback(node);
            });

            // Serial In
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
            setCallback(node);
        }
        else {
            this.error(RED._("serial.errors.missing-conf"), {});
        }

        this.on("close", function(done) {
            if (this.serialConfig) {
                serialPool.close(this.serialConfig.serialport,done);
            }
            else {
                done();
            }
        });
    }