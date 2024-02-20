function PiFACEInNode(n) {
        RED.nodes.createNode(this,n);
        this.buttonState = -1;
        this.npin = n.pin;
        this.pin = pintable[n.pin];
        this.intype = n.intype;
        this.read = n.read || false;
        if (this.read) { this.buttonState = -2; }
        var node = this;
        if (node.pin) {
            exec("gpio -p mode "+node.pin+" "+node.intype, function(err,stdout,stderr) {
                if (err) { node.error(err); }
                else {
                    node._interval = setInterval( function() {
                        exec("gpio -p read "+node.pin, function(err,stdout,stderr) {
                            if (err) {
                                node.error(err);
                                node.status({fill:"red",shape:"ring",text:"error"});
                            }
                            else {
                                if (node.buttonState !== Number(stdout)) {
                                    var previousState = node.buttonState;
                                    node.buttonState = Number(stdout);
                                    if (previousState !== -1) {
                                        node.status({fill:"green",shape:"dot",text:node.buttonState.toString()});
                                        var msg = {topic:"piface/"+node.npin, payload:node.buttonState};
                                        node.send(msg);
                                    }
                                }
                            }
                        });
                    }, 200);
                }
            });
        }
        else {
            node.error("Invalid PiFACE pin: "+node.pin);
        }
        node.on("close", function() {
            clearInterval(node._interval);
        });
    }