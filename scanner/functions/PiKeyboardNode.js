function PiKeyboardNode(n) {
        RED.nodes.createNode(this,n);
        var node = this;

        var doConnect = function() {
            node.child = spawn(gpioCommand, ["kbd","0"]);
            node.status({fill:"green",shape:"dot",text:"rpi-gpio.status.ok"});

            node.child.stdout.on('data', function (data) {
                var d = data.toString().trim().split("\n");
                for (var i = 0; i < d.length; i++) {
                    if (d[i] !== '') {
                        var b = d[i].trim().split(",");
                        var act = "up";
                        if (b[1] === "1") { act = "down"; }
                        if (b[1] === "2") { act = "repeat"; }
                        node.send({ topic:"pi/key", payload:Number(b[0]), action:act });
                    }
                }
            });

            node.child.stderr.on('data', function (data) {
                if (RED.settings.verbose) { node.log("err: "+data+" :"); }
            });

            node.child.on('close', function (code) {
                node.running = false;
                node.child = null;
                if (RED.settings.verbose) { node.log(RED._("rpi-gpio.status.closed")); }
                if (node.finished) {
                    node.status({fill:"grey",shape:"ring",text:"rpi-gpio.status.closed"});
                    node.finished();
                }
                else {
                    node.status({fill:"red",shape:"ring",text:"rpi-gpio.status.stopped"});
                    setTimeout(function() { doConnect(); },2000)
                }
            });

            node.child.on('error', function (err) {
                if (err.errno === "ENOENT") { node.error(RED._("rpi-gpio.errors.commandnotfound")); }
                else if (err.errno === "EACCES") { node.error(RED._("rpi-gpio.errors.commandnotexecutable")); }
                else { node.error(RED._("rpi-gpio.errors.error")+': ' + err.errno); }
            });
        }

        if (allOK === true) {
            doConnect();

            node.on("close", function(done) {
                node.status({});
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