function PibrellaIn(n) {
        RED.nodes.createNode(this,n);
        this.buttonState = -1;
        this.pin = pintable[n.pin];
        this.read = n.read || false;
        if (this.read) { this.buttonState = -2; }
        var node = this;
        if (!pinsInUse.hasOwnProperty(this.pin)) {
            pinsInUse[this.pin] = "tri";
        }
        else {
            if ((pinsInUse[this.pin] !== "tri")||(pinsInUse[this.pin] === "pwm")) {
                node.error("GPIO pin "+this.pin+" already set as "+pinTypes[pinsInUse[this.pin]]);
            }
        }

        if (node.pin !== undefined) {
            node.child = spawn(gpioCommand, ["in",node.pin,"down",35]);
            node.running = true;
            node.status({fill:"green",shape:"dot",text:"OK"});

            node.child.stdout.on('data', function (data) {
                data = data.toString().trim();
                if (data.length > 0) {
                    if (node.buttonState !== -1) {
                        node.send({ topic:"pibrella/"+tablepin[node.pin], payload:Number(data) });
                    }
                    node.buttonState = data;
                    node.status({fill:"green",shape:"dot",text:data});
                    if (RED.settings.verbose) { node.log("out: "+data+" :"); }
                }
            });

            node.child.stderr.on('data', function (data) {
                if (RED.settings.verbose) { node.log("err: "+data+" :"); }
            });

            node.child.on('close', function (code) {
                if (RED.settings.verbose) { node.log("ret: "+code+" :"); }
                node.child = null;
                node.running = false;
                node.status({fill:"red",shape:"circle",text:""});
            });

            node.child.on('error', function (err) {
                if (err.errno === "ENOENT") { node.warn('Command not found'); }
                else if (err.errno === "EACCES") { node.warn('Command not executable'); }
                else { node.log('error: ' + err); }
            });

        }
        else {
            node.error("Invalid GPIO pin: "+node.pin);
        }

        node.on("close", function() {
            if (node.child != null) {
                node.child.stdin.write(" close "+node.pin);
                node.child.kill('SIGKILL');
            }
            node.status({fill:"red",shape:"circle",text:""});
            delete pinsInUse[node.pin];
            if (RED.settings.verbose) { node.log("end"); }
        });
    }