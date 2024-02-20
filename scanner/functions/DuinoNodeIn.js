function DuinoNodeIn(n) {
        RED.nodes.createNode(this,n);
        this.buttonState = -1;
        this.pin = n.pin;
        this.state = n.state;
        this.arduino = n.arduino;
        this.serverConfig = RED.nodes.getNode(this.arduino);
        this.running = false;
        var node = this;
        if (typeof this.serverConfig === "object") {
            var startup = function() {
                node.board = node.serverConfig.board;
                node.board.setMaxListeners(0);
                node.oldval = "";
                node.status({fill:"grey",shape:"ring",text:"node-red:common.status.connecting"});
                var doit = function() {
                    node.running = true;
                    if (node.state === "ANALOG") { node.board.pinMode(node.pin, 0x02); }
                    if (node.state === "INPUT") { node.board.pinMode(node.pin, 0x00); }
                    if (node.state === "PULLUP") { node.board.pinMode(node.pin, 0x0B); }
                    node.status({fill:"green",shape:"dot",text:"node-red:common.status.connected"});
                    if (node.state === "ANALOG") {
                        node.board.analogRead(node.pin, function(v) {
                            if (v !== node.oldval) {
                                node.oldval = v;
                                node.send({payload:v, topic:"A"+node.pin});
                            }
                        });
                    }
                    if (node.state === "INPUT") {
                        node.board.digitalRead(node.pin, function(v) {
                            if (v !== node.oldval) {
                                node.oldval = v;
                                node.send({payload:v, topic:node.pin});
                            }
                        });
                    }
                    if (node.state === "PULLUP") {
                        node.board.digitalRead(node.pin, function(v) {
                            if (v !== node.oldval) {
                                node.oldval = v;
                                node.send({payload:v, topic:node.pin});
                            }
                        });
                    }
                    if (node.state == "STRING") {
                        node.board.on('string', function(v) {
                            if (v !== node.oldval) {
                                node.oldval = v;
                                node.send({payload:v, topic:"string"});
                            }
                        });
                    }
                    node.board.once('disconnect', function() {
                        node.status({fill:"red",shape:"ring",text:"node-red:common.status.not-connected"});
                        if (node.running) { setTimeout(function() { node.running = false; startup(); }, 5500); }
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