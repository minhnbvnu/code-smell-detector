function GPioInNode(n) {
        RED.nodes.createNode(this,n);
        this.host = n.host || "127.0.0.1";
        this.port = n.port || 8888;
        this.pin = n.pin;
        this.pio = bcm2pin[n.pin];
        this.intype = n.intype;
        this.read = n.read || false;
        this.debounce = Number(n.debounce || 25);
        var node = this;
        var PiGPIO;

        if (node.pin !== undefined) {
            PiGPIO = new Pigpio();
            var inerror = false;
            var doit = function() {
                PiGPIO.pi(node.host, node.port, function(err) {
                    if (err) {
                        node.status({fill:"red",shape:"ring",text:err.code+" "+node.host+":"+node.port});
                        if (!inerror) { node.error(err); inerror = true; }
                        node.retry = setTimeout(function() { doit(); }, 5000);
                    }
                    else {
                        inerror = false;
                        PiGPIO.set_mode(node.pin,PiGPIO.INPUT);
                        PiGPIO.set_pull_up_down(node.pin,PiGPIO[node.intype]);
                        PiGPIO.set_glitch_filter(node.pin,node.debounce);
                        node.status({fill:"green",shape:"dot",text:"node-red:common.status.ok"});
                        node.cb = PiGPIO.callback(node.pin, PiGPIO.EITHER_EDGE, function(gpio, level, tick) {
                            node.send({ topic:"pi/"+node.pio, payload:Number(level), host:node.host });
                            node.status({fill:"green",shape:"dot",text:level});
                        });
                        if (node.read) {
                            setTimeout(function() {
                                PiGPIO.read(node.pin, function(err, level) {
                                    node.send({ topic:"pi/"+node.pio, payload:Number(level), host:node.host });
                                    node.status({fill:"green",shape:"dot",text:level});
                                });
                            }, 20);
                        }
                    }
                });
            }
            doit();
        }
        else {
            node.warn(RED._("pi-gpiod:errors.invalidpin")+": "+node.pio);
        }

        node.on("close", function(done) {
            if (node.retry) { clearTimeout(node.retry); }
            node.status({fill:"grey",shape:"ring",text:"pi-gpiod.status.closed"});
            node.cb.cancel();
            PiGPIO.close();
            done();
        });
    }