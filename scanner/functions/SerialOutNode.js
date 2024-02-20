function SerialOutNode(n) {
        RED.nodes.createNode(this,n);
        this.serialConfig = RED.nodes.getNode(n.serial);

        if (!this.serialConfig) {
            this.error(RED._("serial.errors.missing-conf"), {});
            return;
        }

        this.serial = n.serial;
        var node = this;
        node.port = serialPool.get(this.serialConfig);
        var serialConfig = this.serialConfig;

        this.serialConfig.on('start', function() {
            node.port = serialPool.get(serialConfig);
        });

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
            var payload = node.port.encodePayload(msg.payload);
            node.port.write(payload,function(err,res) {
                if (err) {
                    var errmsg = err.toString().replace("Serialport","Serialport "+node.port.serial.path);
                    node.error(errmsg,msg);
                }
            });
        });
        node.port.on('ready', function() {
            node.status({fill:"green",shape:"dot",text:"node-red:common.status.connected"});
        });
        node.port.on('closed', function() {
            node.status({fill:"red",shape:"ring",text:"node-red:common.status.not-connected"});
        });
        node.port.on('stopped', function() {
            node.status({fill:"grey",shape:"ring",text:"serial.status.stopped"});
        });
    }