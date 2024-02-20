function PiLiter(n) {
        RED.nodes.createNode(this,n);
        this.pinv = n.pin;
        this.dir = (n.dir ? 1 : 0) || 0;
        var node = this;

        if (allOK === true) {
            if (this.pinv === "bar") {
                node.child = spawn(gpioCommand, ["byte",node.dir]);
                node.on("input", function(msg) {
                    var out = Number(msg.payload);
                    if ((out >= 1) && (out <= 8)) { out = Math.pow(2, out) - 1; }
                    else { out = 0; }
                    if (node.child !== null) { node.child.stdin.write(out+"\n"); }
                    else { node.warn("Command not running"); }
                });
            }
            else if (this.pinv === "meter") {
                node.child = spawn(gpioCommand, ["byte",node.dir]);
                node.on("input", function(msg) {
                    var out = Number(msg.payload);
                    if ((out >= 1) && (out <= 8)) { out = Math.pow(2, (out-1)); }
                    else { out = 0; }
                    if (node.child !== null) { node.child.stdin.write(out+"\n"); }
                    else { node.warn("Command not running"); }
                });
            }
            else if (this.pinv === "all") {
                node.child = spawn(gpioCommand, ["byte",node.dir]);
                node.on("input", function(msg) {
                    var out = msg.payload;
                    if ((out === 1)|(out === true)|(out === "1")|(out === "on")) {
                        out = 255;
                    }
                    else { out = 0; }
                    if (node.child !== null) { node.child.stdin.write(out+"\n"); }
                    else { node.warn("Command not running"); }
                });
            }
            else if (this.pinv === "pin") {
                node.child = spawn(gpioCommand, ["byte",node.dir]);
                var byte = 0;
                node.on("input", function(msg) {
                    if (typeof msg.payload === "object") {
                        var out = Number(msg.payload.led);
                        var l = Number(msg.payload.state);
                        if ((out >= 1) && (out <= 8)) {
                            out = (Math.pow(2, (out-1)));
                            if (l === 0) { byte = (byte & (~out) & 255); }
                            else { byte = (byte | out) & 255; }
                            if (node.child !== null) { node.child.stdin.write(byte+"\n"); }
                            else { node.warn("Command not running"); }
                        }
                        else { node.warn("Not a valid object - see Info panel."); }
                    }
                    else { node.warn("Not a valid object - see Info panel."); }
                });
            }
            else {
                node.child = spawn(gpioCommand, ["byte",node.dir]);
                node.on("input", function(msg) {
                    var out = Number(msg.payload);
                    if ((out >= 0) && (out <= 255)) {
                        if (node.child !== null) { node.child.stdin.write(out+"\n"); }
                        else { node.warn("Command not running"); }
                    }
                    else { node.warn("Invalid input - not between 0 and 255"); }
                });
            }

            node.on("close", function() {
                if (node.child != null) {
                    node.child.kill('SIGKILL');
                }
                if (RED.settings.verbose) { node.log("end"); }
            });
        }
        else {
            node.status({fill:"grey",shape:"dot",text:"node-red:rpi-gpio.status.not-available"});
        }
    }