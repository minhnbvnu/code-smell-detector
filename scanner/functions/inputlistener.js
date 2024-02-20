function inputlistener(msg) {
            if (msg != null) {
                if (msg.hasOwnProperty("stop")) {
                    node.stopped = true;
                    if (node.running) {
                        node.child.kill(node.closer);
                    }
                    node.status({fill:"grey",shape:"ring",text:RED._("daemon.status.stopped")});
                }
                else if (msg.hasOwnProperty("kill") && node.running) {
                    if (typeof msg.kill !== "string" || msg.kill.length === 0 || !msg.kill.toUpperCase().startsWith("SIG") ) { msg.kill = "SIGINT"; }
                    node.child.kill(msg.kill.toUpperCase());
                }
                else if (msg.hasOwnProperty("start")) {
                    if (!node.running) {
                        let args = "";
                        if (msg.hasOwnProperty("args") && msg.args.length > 0) {
                            args = parseArgs(msg.args.trim());
                        }
                        runit(args);
                    }
                    node.stopped = false;
                }
                else {
                    if (!Buffer.isBuffer(msg.payload)) {
                        if (typeof msg.payload === "object") { msg.payload = JSON.stringify(msg.payload); }
                        if (typeof msg.payload !== "string") { msg.payload = msg.payload.toString(); }
                        if (node.cr === true) { msg.payload += "\n"; }
                    }
                    node.debug("inp: "+msg.payload);
                    lastmsg = msg;
                    if (node.child !== null && node.running) { node.child.stdin.write(msg.payload); }
                    else { node.warn(RED._("daemon.errors.notrunning")); }
                }
            }
        }