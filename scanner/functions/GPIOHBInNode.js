function GPIOHBInNode(n) {
        RED.nodes.createNode(this,n);
        this.buttonState = -1;
        this.pin = pintable[n.pin];
        this.intype = n.intype;
        this.read = n.read || false;
        if (this.read) { this.buttonState = -2; }
        var node = this;

        var readit = function() {
            exec(gpioCommand+" read "+node.pin, function(err,stdout,stderr) {
                if (err) { node.error(err); }
                else {
                    exec(gpioCommand+" wfi "+node.pin + " both", function(err,stdo,stde) {
                        if (err) { node.error(err); }
                        else { readit(); }
                    });
                    if (node.buttonState !== Number(stdout)) {
                        var previousState = node.buttonState;
                        node.buttonState = Number(stdout);
                        if (previousState !== -1) {
                            var msg = {topic:"pi/"+tablepin[node.pin], payload:(node.buttonState === 0 ? 0 : 1)};
                            node.send(msg);
                        }
                    }
                }
            });
        }

        if (node.pin !== undefined) {
            exec(gpioCommand+" mode "+node.pin+" "+node.intype, function(err,stdout,stderr) {
                if (err) { node.error(err); }
                else {
                    readit();
                }
            });
        }
        else {
            node.error("Invalid GPIO pin: "+node.pin);
        }

        node.on("close", function() {
            clearInterval(node._interval);
            exec(gpioCommand+" close "+node.pin);
        });
    }