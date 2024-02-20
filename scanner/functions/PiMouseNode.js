function PiMouseNode(n) {
        RED.nodes.createNode(this,n);
        this.butt = n.butt || 7;
        var node = this;

        if (allOK === true) {
            node.child = spawn(gpioCommand, ["mouse",node.butt]);
            node.status({fill:"green",shape:"dot",text:"rpi-gpio.status.ok"});

            node.child.stdout.on('data', function (data) {
                data = Number(data);
                if (data !== 0) { node.send({ topic:"pi/mouse", button:data, payload:1 }); }
                else { node.send({ topic:"pi/mouse", button:data, payload:0 }); }
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
                if (err.errno === "ENOENT") { node.error(RED._("rpi-gpio.errors.commandnotfound")); }
                else if (err.errno === "EACCES") { node.error(RED._("rpi-gpio.errors.commandnotexecutable")); }
                else { node.error(RED._("rpi-gpio.errors.error")+': ' + err.errno); }
            });

            node.on("close", function(done) {
                node.status({fill:"grey",shape:"ring",text:"rpi-gpio.status.closed"});
                if (node.child != null) {
                    node.finished = done;
                    node.child.kill('SIGINT');
                    node.child = null;
                }
                else { done(); }
            });
        }
        else {
            node.status({fill:"grey",shape:"dot",text:"rpi-gpio.status.not-available"});
        }
    }