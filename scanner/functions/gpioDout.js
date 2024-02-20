function gpioDout(n) {
        RED.nodes.createNode(this, n);
        this.pin = Number(n.pin);
        this.set = n.set;
        this.level = Number(n.level);
        var node = this;
        if (node.pin === 14) {
            node.p = new m.Gpio(3,false,true);  // special for onboard LED v1
        }
        else {
            node.p = new m.Gpio(node.pin);
        }
        node.p.mode(m.PIN_GPIO);
        node.p.dir(m.DIR_OUT);
        if (node.set) {
            node.p.write(node.level);
        }
        node.on("input", function(msg) {
            if (msg.payload == "1") {
                node.p.write(1);
            }
            else {
                node.p.write(0);
            }
        });

        this.on('close', function() {
            node.p.close();
        });
    }