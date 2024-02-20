function GPIOHBOutNode(n) {
        RED.nodes.createNode(this,n);
        this.pin = pintable[n.pin];
        this.set = n.set || false;
        this.level = n.level || 0;
        this.out = n.out || "out";
        var node = this;
        if (node.out === "pwm") { node.op = "pwm"; }
        else { node.op = "write"; }

        if (node.pin !== undefined) {
            exec(gpioCommand+" mode "+node.pin+" "+node.out, function(err,stdout,stderr) {
                if (err) { node.error(err); }
                else {
                    if (node.set && (node.out === "out")) {
                        exec(gpioCommand+" write "+node.pin+" "+node.level, function(err,stdout,stderr) {
                            if (err) { node.error(err); }
                        });
                    }
                    node.on("input", function(msg) {
                        if (msg.payload === "true") { msg.payload = true; }
                        if (msg.payload === "false") { msg.payload = false; }
                        var out = Number(msg.payload);
                        var limit = 1;
                        if (node.out === "pwm") { limit = 1023; }
                        if ((out >= 0) && (out <= limit)) {
                            exec(gpioCommand+" "+node.op+" "+node.pin+" "+out, function(err,stdout,stderr) {
                                if (err) { node.error(err); }
                            });
                        }
                        else { node.warn("Invalid input: "+out); }
                    });
                }
            });
        }
        else {
            node.error("Invalid GPIO pin: "+node.pin);
        }

        node.on("close", function() {
            exec(gpioCommand+" close "+node.pin);
        });
    }