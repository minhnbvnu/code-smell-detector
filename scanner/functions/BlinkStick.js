function BlinkStick(n) {
        RED.nodes.createNode(this,n);
        var p1 = /^\#[A-Fa-f0-9]{6}$/
        var p2 = /[0-9]+,[0-9]+,[0-9]+/
        this.led = blinkstick.findFirst(); // maybe try findAll() (one day)
        var node = this;

        this.on("input", function(msg) {
            if (msg != null) {
                if (Object.size(node.led) !== 0) {
                    try {
                        if (p2.test(msg.payload)) {
                            var rgb = msg.payload.split(",");
                            node.led.setColor(parseInt(rgb[0])&255, parseInt(rgb[1])&255, parseInt(rgb[2])&255);
                        }
                        else {
                            node.led.setColor(msg.payload.toLowerCase().replace(/\s+/g,''));
                        }
                    }
                    catch (err) {
                        node.warn("BlinkStick missing ?");
                        node.led = blinkstick.findFirst();
                    }
                }
                else {
                    //node.warn("No BlinkStick found");
                    node.led = blinkstick.findFirst();
                }
            }
        });
        if (Object.size(node.led) === 0) {
            node.error("No BlinkStick found");
        }

    }