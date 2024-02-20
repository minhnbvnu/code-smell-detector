function SerialInNode(n) {
        RED.nodes.createNode(this,n);
        this.serialConfig = RED.nodes.getNode(n.serial);

        if (!this.serialConfig) {
            this.error(RED._("serial.errors.missing-conf"), {});
            return;
        }

        this.serial = n.serial;
        var node = this;

        this.serialConfig.on('start', function() {
            setCallback(node, node.serialConfig);
        });

        this.on("close", function(done) {
                serialPool.close(this.serialConfig.serialport,done);
        });

        function setCallback(node) {
            node.status({fill:"grey",shape:"dot",text:"node-red:common.status.not-connected"});
            node.port = serialPool.get(node.serialConfig);

            node.port.on('data', function(msgout) {
                node.send(msgout);
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
        setCallback(node)
    }