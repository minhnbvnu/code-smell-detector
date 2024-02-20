function PiSrfNode(n) {
        RED.nodes.createNode(this, n);
        this.topic = n.topic;
        this.pins = n.pins;
        this.pins += ","+(n.pulse || 0.5);
		this.pins += ","+(n.precision || 0);
        var node = this;

        if (allOK === true) {
            if (node.pins !== undefined) {
                node.child = spawn(gpioCommand, [node.pins]);
                node.running = true;
                if (RED.settings.verbose) { node.log("parameters: " + node.pins + " :"); }

                node.child.stdout.on('data', function(data) {
                    if (RED.settings.verbose) { node.log("out: " + data + " :"); }
                    data = data.toString().trim();
                    if (data.length > 0) {
                        node.send({topic:node.topic, payload:data});
                    }
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
                node.error("Invalid Parameters: " + node.pins);
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
                    node.child.kill('SIGKILL');
                }
                wfi(done);
            });
        }
        else {
            node.status({fill:"grey",shape:"dot",text:"node-red:rpi-gpio.status.not-available"});
        }
    }