function SerialControlNode(n) {
        const configProps = [
            "serialport", "serialbaud", "databits", "parity", "stopbits",
            "dtr", "rts", "cts", "dsr"
        ]
        RED.nodes.createNode(this,n);
        this.serialConfig = RED.nodes.getNode(n.serial);

        if (!this.serialConfig) {
            this.error(RED._("serial.errors.missing-conf"), {});
            return;
        }

        this.serial = n.serial;
        var node = this;
        node.port = serialPool.get(node.serialConfig);
        node.port.on('stopped', function() {
            node.status({fill:"grey",shape:"ring",text:"serial.status.stopped"});
        });
        node.port.on('ready', function() {
            node.status({fill:"green",shape:"dot",text:node.serialConfig.serialbaud+","+node.serialConfig.databits+","+(node.serialConfig.parity.toUpperCase().substr(0,1))+","+node.serialConfig.stopbits});
        });
        node.on("input",function(msg) {
            if (msg.hasOwnProperty("flush") && msg.flush === true) { node.port.serial.flush(); }
            if (configProps.some((p) => { return msg.payload.hasOwnProperty(p) })) {
                msg.payload.enabled = msg.payload.hasOwnProperty('enabled') ? msg.payload.enabled : true;
                node.serialConfig.changePort(msg.payload);
            }
            var stat = {fill:"green",shape:"dot",text:node.serialConfig.serialbaud+","+node.serialConfig.databits+","+(node.serialConfig.parity.toUpperCase().substr(0,1))+","+node.serialConfig.stopbits}
            if (msg.payload.hasOwnProperty("enabled")) {
                node.serialConfig.enabled = msg.payload.enabled;
                if (msg.payload.enabled === true || msg.payload.enabled === "true") {
                    node.serialConfig.emit('start');
                }
                else {
                    serialPool.close(node.serialConfig.serialport,() => {
                        RED.log.info("[serialconfig:"+node.serialConfig.id+"] " + RED._("serial.stopped",{port:node.serialConfig.serialport}));
                    });
                    stat.fill = "grey";
                    stat.shape = "ring";
                }
            }
            let currentConfig = {};
            configProps.map((p) => {
                currentConfig[p] = node.serialConfig[p];
            });
            currentConfig.enabled = node.serialConfig.enabled;
            node.status(stat);
            node.send({payload:currentConfig});
        });
    }