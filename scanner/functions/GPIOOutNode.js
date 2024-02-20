function GPIOOutNode(n) {
        RED.nodes.createNode(this,n);
        this.pin = (n.bcm === true) ? n.pin : pin2bcm[n.pin];
        this.set = n.set || false;
        this.level = n.level || 0;
        this.freq = n.freq || 100;
        this.out = n.out || "out";
        var node = this;
        if (!pinsInUse.hasOwnProperty(this.pin)) {
            pinsInUse[this.pin] = this.out;
        }
        else {
            if ((pinsInUse[this.pin] !== this.out)||(pinsInUse[this.pin] === "pwm")) {
                node.warn(RED._("rpi-gpio.errors.alreadyset",{pin:this.pin,type:pinTypes[pinsInUse[this.pin]]}));
            }
        }

        function inputlistener(msg, send, done) {
            if (msg.payload === "true") { msg.payload = true; }
            if (msg.payload === "false") { msg.payload = false; }
            var out = Number(msg.payload);
            var limit = 1;
            if (node.out === "pwm") { limit = 100; }
            if ((out >= 0) && (out <= limit)) {
                if (RED.settings.verbose) { node.log("out: "+out); }
                if (node.child !== null) {
                    node.child.stdin.write(out+"\n", () => {
                        if (done) { done(); }
                    });
                    node.status({fill:"green",shape:"dot",text:msg.payload.toString()});
                }
                else {
                    node.error(RED._("rpi-gpio.errors.pythoncommandnotfound"),msg);
                    node.status({fill:"red",shape:"ring",text:"rpi-gpio.status.not-running"});
                }
            }
            else { node.warn(RED._("rpi-gpio.errors.invalidinput")+": "+out); }
        }

        if (allOK === true) {
            if (node.pin !== undefined) {
                if (node.set && (node.out === "out")) {
                    node.child = spawn(gpioCommand, [node.out,node.pin,node.level]);
                    node.status({fill:"green",shape:"dot",text:node.level});
                } else {
                    node.child = spawn(gpioCommand, [node.out,node.pin,node.freq]);
                    node.status({fill:"yellow",shape:"dot",text:"rpi-gpio.status.ok"});
                }
                node.running = true;

                node.on("input", inputlistener);

                node.child.stdout.on('data', function (data) {
                    if (RED.settings.verbose) { node.log("out: "+data+" :"); }
                });

                node.child.stderr.on('data', function (data) {
                    if (RED.settings.verbose) { node.log("err: "+data+" :"); }
                });

                node.child.on('close', function (code) {
                    node.child = null;
                    node.running = false;
                    if (RED.settings.verbose) { node.log(RED._("rpi-gpio.status.closed")); }
                    if (node.finished) {
                        node.status({fill:"grey",shape:"ring",text:"rpi-gpio.status.closed"});
                        node.finished();
                    }
                    else { node.status({fill:"red",shape:"ring",text:"rpi-gpio.status.stopped"}); }
                });

                node.child.on('error', function (err) {
                    if (err.code === "ENOENT") { node.error(RED._("rpi-gpio.errors.commandnotfound")+err.path,err); }
                    else if (err.code === "EACCES") { node.error(RED._("rpi-gpio.errors.commandnotexecutable")+err.path,err); }
                    else { node.error(RED._("rpi-gpio.errors.error",{error:err.code}),err) }
                });

                node.child.stdin.on('error', function (err) {
                    if (!node.finished) {
                        node.error(RED._("rpi-gpio.errors.error",{error:err.code}),err);
                    }
                });
            }
            else {
                node.warn(RED._("rpi-gpio.errors.invalidpin")+": "+node.pin);
            }
        }
        else {
            node.status({fill:"grey",shape:"dot",text:"rpi-gpio.status.not-available"});
            node.on("input", function(msg) {
                node.status({fill:"grey",shape:"dot",text:RED._("rpi-gpio.status.na",{value:msg.payload.toString()})});
            });
        }

        node.on("close", function(done) {
            node.status({fill:"grey",shape:"ring",text:"rpi-gpio.status.closed"});
            delete pinsInUse[node.pin];
            if (node.child != null) {
                node.finished = done;
                node.child.stdin.write("close "+node.pin, () => {
                    node.child.kill('SIGKILL');
                    setTimeout(function() { if (done) { done(); } }, 50);
                });
            }
            else { if (done) { done(); } }
        });

    }