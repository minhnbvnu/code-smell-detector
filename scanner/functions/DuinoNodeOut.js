function DuinoNodeOut(n) {
        RED.nodes.createNode(this,n);
        this.buttonState = -1;
        this.pin = n.pin;
        this.state = n.state;
        this.arduino = n.arduino;
        this.serverConfig = RED.nodes.getNode(this.arduino);
        this.running = false;
        var node = this;
        if (typeof node.serverConfig === "object") {
            var startup = function() {
                node.board = node.serverConfig.board;
                node.board.setMaxListeners(0);
                node.status({fill:"grey",shape:"ring",text:"node-red:common.status.connecting"});
                var doit = function() {
                    node.running = true;
                    if (node.state === "OUTPUT") { node.board.pinMode(node.pin, 0x01); }
                    if (node.state === "PWM") { node.board.pinMode(node.pin, 0x03); }
                    if (node.state === "SERVO") { node.board.pinMode(node.pin, 0x04); }
                    node.status({fill:"green",shape:"dot",text:"node-red:common.status.connected"});
                    node.on("input", function(msg) {
                        if (node.board.isReady) {
                            if (node.state === "OUTPUT") {
                                if ((msg.payload === true)||(msg.payload.toString() == "1")||(msg.payload.toString().toLowerCase() == "on")) {
                                    node.board.digitalWrite(node.pin, node.board.HIGH);
                                }
                                if ((msg.payload === false)||(msg.payload.toString() == "0")||(msg.payload.toString().toLowerCase() == "off")) {
                                    node.board.digitalWrite(node.pin, node.board.LOW);
                                }
                            }
                            if (node.state === "PWM") {
                                msg.payload = parseInt((msg.payload * 1) + 0.5);
                                if ((msg.payload >= 0) && (msg.payload <= 255)) {
                                    node.board.analogWrite(node.pin, msg.payload);
                                }
                            }
                            if (node.state === "SERVO") {
                                msg.payload = parseInt((msg.payload * 1) + 0.5);
                                if ((msg.payload >= 0) && (msg.payload <= 180)) {
                                    node.board.servoWrite(node.pin, msg.payload);
                                }
                            }
                            if (node.state === "SYSEX") {
                                node.board.sysexCommand(msg.payload);
                            }
                            if (node.state === "STRING") {
                                node.board.sendString(msg.payload.toString());
                            }
                        }
                    });
                    node.board.once('disconnect', function() {
                        node.status({fill:"red",shape:"ring",text:"node-red:common.status.not-connected"});
                        if (node.running === true) { setTimeout(function() { node.running = false; startup(); }, 5500); }
                    });
                }
                if (node.board.isReady) { doit(); }
                else { node.board.once("ready", function() { doit(); }); }
                setTimeout(function() { if (node.running === false) { startup(); } }, 4500);
            }
            startup();
        }
        else {
            node.warn(RED._("arduino.errors.portnotconf"));
        }
        node.on('close', function() {
            node.running = false;
        });
    }