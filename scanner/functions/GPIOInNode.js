function GPIOInNode(n) {
        RED.nodes.createNode(this,n);
        this.buttonState = -1;
        this.pin = (n.bcm === true) ? n.pin : pin2bcm[n.pin];
        this.intype = n.intype;
        this.read = n.read || false;
        this.debounce = Number(n.debounce || 25);
        if (this.read) { this.buttonState = -2; }
        var node = this;
        if (!pinsInUse.hasOwnProperty(this.pin)) {
            pinsInUse[this.pin] = this.intype;
        }
        else {
            if ((pinsInUse[this.pin] !== this.intype)||(pinsInUse[this.pin] === "pwm")) {
                node.warn(RED._("rpi-gpio.errors.alreadyset",{pin:this.pin,type:pinTypes[pinsInUse[this.pin]]}));
            }
        }

        var startPin = function() {
            node.child = spawn(gpioCommand, ["in",node.pin,node.intype,node.debounce]);
            node.running = true;
            node.status({fill:"yellow",shape:"dot",text:"rpi-gpio.status.ok"});

            node.child.stdout.on('data', function (data) {
                var d = data.toString().trim().split("\n");
                for (var i = 0; i < d.length; i++) {
                    if (d[i] === '') { return; }
                    if (node.running && node.buttonState !== -1 && !isNaN(Number(d[i])) && node.buttonState !== d[i]) {
                        node.send({ topic:"gpio/"+node.pin, payload:Number(d[i]) });
                    }
                    node.buttonState = d[i];
                    node.status({fill:"green",shape:"dot",text:d[i]});
                    if (RED.settings.verbose) { node.log("out: "+d[i]+" :"); }
                }
            });

            node.child.stderr.on('data', function (data) {
                if (RED.settings.verbose) { node.log("err: "+data+" :"); }
            });

            node.child.on('close', function (code) {
                node.running = false;
                node.child.removeAllListeners();
                delete node.child;
                if (RED.settings.verbose) { node.log(RED._("rpi-gpio.status.closed")); }
                if (!node.finished && code === 1) {
                    setTimeout(function() {startPin()}, 250);
                }
                else if (node.finished) {
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

        if (allOK === true) {
            if (node.pin !== undefined) {
                startPin();
            }
            else {
                node.warn(RED._("rpi-gpio.errors.invalidpin")+": "+node.pin);
            }
        }
        else {
            node.status({fill:"grey",shape:"dot",text:"rpi-gpio.status.not-available"});
            if (node.read === true) {
                var val;
                if (node.intype == "up") { val = 1; }
                if (node.intype == "down") { val = 0; }
                setTimeout(function() {
                    node.send({ topic:"gpio/"+node.pin, payload:val });
                    node.status({fill:"grey",shape:"dot",text:RED._("rpi-gpio.status.na",{value:val})});
                },250);
            }
        }

        node.on("close", function(done) {
            node.status({fill:"grey",shape:"ring",text:"rpi-gpio.status.closed"});
            delete pinsInUse[node.pin];
            if (node.child != null) {
                node.finished = done;
                node.child.stdin.write("close "+node.pin, () => {
                    if (node.child) {
                        node.child.kill('SIGKILL');
                    }
                });
            }
            else { if (done) { done(); } }
        });
    }