function PiLcdNode(n) {
        RED.nodes.createNode(this, n);
        this.pins = n.pins;
        var node = this;

        function inputlistener(msg) {
            if (RED.settings.verbose) { node.log("inp: " + msg.payload); }
            if (node.child !== null) { node.child.stdin.write(msg.payload + "\n"); }
            else { node.warn("Command not running"); }
        }

        if (allOK === true) {
            if (node.pins !== undefined) {
                node.child = spawn(gpioCommand, [node.pins]);
                node.running = true;
                if (RED.settings.verbose) { node.log("pin: " + node.pins + " :"); }
                node.on("input", inputlistener);

                node.child.stdout.on('data', function(data) {
                    if (RED.settings.verbose) { node.log("out: " + data + " :"); }
                });

                node.child.stderr.on('data', function(data) {
                    if (RED.settings.verbose) { node.log("err: " + data + " :"); }
                });

                node.child.on('close', function(code) {
                    if (RED.settings.verbose) { node.log("ret: " + code + " :"); }
                    node.child = null;
                    node.running = false;
                });

                node.child.on('error', function(err) {
                    if (err.errno === "ENOENT") { node.warn('Command not found'); }
                    else if (err.errno === "EACCES") { node.warn('Command not executable'); }
                    else { node.log('error: ' + err); }
                });

            }
            else {
                node.error("Invalid GPIO pins: " + node.pin);
            }

            var wfi = function(done) {
                if (!node.running) {
                    if (RED.settings.verbose) { node.log("end"); }
                    done();
                    return;
                }
                setTimeout(function() { wfi(done); }, 333);
            }

            node.on("close", function(done) {
                if (node.child != null) {
                    node.child.stdin.write("c:lose" + node.pin);
                    node.child.kill('SIGKILL');
                }
                wfi(done);
            });
        }
        else {
            node.status({fill:"grey",shape:"dot",text:"pilcd.status.not-available"});
            node.on("input", function(msg){
                node.status({fill:"grey",shape:"dot",text:RED._("pilcd.status.na",{value:msg.payload.toString()})});
            });
        }
    }