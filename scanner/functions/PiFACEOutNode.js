function PiFACEOutNode(n) {
        RED.nodes.createNode(this,n);
        this.pin = pintable[n.pin];
        this.set = n.set;
        this.level = n.level;
        var node = this;
        if (node.pin) {
            if (node.set) {
                exec("gpio -p write "+node.pin+" "+node.level, function(err,stdout,stderr) {
                    if (err) {
                        node.status({fill:"red",shape:"ring",text:"error"});
                        node.error(err);
                    }
                    else {
                        node.status({fill:"yellow",shape:"dot",text:node.level});
                    }
                });
            }
            node.on("input", function(msg) {
                if (msg.payload === "true") { msg.payload = true; }
                if (msg.payload === "false") { msg.payload = false; }
                var out = Number(msg.payload);
                if ((out === 0)|(out === 1)) {
                    exec("gpio -p write "+node.pin+" "+out, function(err,stdout,stderr) {
                        if (err) {
                            node.status({fill:"red",shape:"ring",text:"error"});
                            node.error(err);
                        }
                        else {
                            node.status({fill:"green",shape:"dot",text:out.toString()});
                        }
                    });
                }
                else { node.warn("Invalid input - not 0 or 1"); }
            });
        }
        else {
            node.error("Invalid PiFACE pin: "+node.pin);
        }
    }