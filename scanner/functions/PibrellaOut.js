function PibrellaOut(n) {
        RED.nodes.createNode(this,n);
        this.pin = pintable[n.pin];
        this.set = n.set || false;
        this.level = n.level || 0;
        this.out = n.out || "out";
        var node = this;
        if (!pinsInUse.hasOwnProperty(this.pin)) {
            pinsInUse[this.pin] = this.out;
        }
        else {
            if ((pinsInUse[this.pin] !== this.out)||(pinsInUse[this.pin] === "pwm")) {
                node.error("GPIO pin "+this.pin+" already set as "+pinTypes[pinsInUse[this.pin]]);
            }
        }

        function inputlistener(msg) {
            if (msg.payload === "true") { msg.payload = true; }
            if (msg.payload === "false") { msg.payload = false; }
            var out = Number(msg.payload);
            var limit = 1;
            if (node.out === "pwm") { limit = 100; }
            if (node.pin === "12") {
                limit = 4096;
                if (out === 1) { out = 262; }
            }
            if ((out >= 0) && (out <= limit)) {
                if (RED.settings.verbose) { node.log("inp: "+msg.payload); }
                if (node.child !== null) { node.child.stdin.write(out+"\n"); }
                else { node.warn("Command not running"); }
                node.status({fill:"green",shape:"dot",text:msg.payload});
            }
            else { node.warn("Invalid input: "+out); }
        }

        if (node.pin !== undefined) {
            if (node.pin === "12") {
                node.child = spawn(gpioCommand, ["buzz",node.pin]);
            }
            else {
                if (node.set && (node.out === "out")) {
                    node.child = spawn(gpioCommand, [node.out,node.pin,node.level]);
                }
                else {
                    node.child = spawn(gpioCommand, [node.out,node.pin]);
                }
            }
            node.running = true;
            node.status({fill:"green",shape:"dot",text:"OK"});

            node.on("input", inputlistener);

            node.child.stdout.on('data', function (data) {
                if (RED.settings.verbose) { node.log("out: "+data+" :"); }
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