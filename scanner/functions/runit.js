function runit(appendArgs) {
            var line = "";
            if (!node.cmd || (typeof node.cmd !== "string") || (node.cmd.length < 1)) {
                node.status({fill:"grey",shape:"ring",text:RED._("daemon.status.nocommand")});
                return;
            }
            let args = node.args;
            if (appendArgs !== undefined && appendArgs.length > 0) {
                args = args.concat(appendArgs);
            }

            try {
                node.child = spawn(node.cmd, args);
                node.debug(node.cmd+" "+JSON.stringify(args));
                node.status({fill:"green",shape:"dot",text:RED._("daemon.status.running")});
                node.running = true;

                node.child.stdout.on('data', function (data) {
                    if (node.op === "string") { data = data.toString(); }
                    if (node.op === "number") { data = Number(data); }
                    node.debug("out: "+data);
                    if (node.op === "lines") {
                        line += data.toString();
                        var bits = line.split("\n");
                        while (bits.length > 1) {
                            var m = RED.util.cloneMessage(lastmsg);
                            m.payload = bits.shift();
                            node.send([m,null,null]);
                        }
                        line = bits[0];
                    }
                    else {
                        if (data && (data.length !== 0)) {
                            lastmsg.payload = data;
                            node.send([lastmsg,null,null]);
                        }
                    }
                });

                node.child.stderr.on('data', function (data) {
                    if (node.op === "string") { data = data.toString(); }
                    if (node.op === "number") { data = Number(data); }
                    node.debug("err: "+data);
                    lastmsg.payload = data;
                    node.send([null,lastmsg,null]);
                });

                node.child.on('close', function (code,signal) {
                    node.debug("ret: "+code+":"+signal);
                    node.running = false;
                    node.child = null;
                    var rc = code;
                    if (code === null) { rc = signal; }
                    node.send([null,null,{payload:rc}]);
                    const color = node.stopped ? "grey" : "red";
                    node.status({fill:color,shape:"ring",text:RED._("daemon.status.stopped")});
                });

                node.child.on('error', function (err) {
                    if (err.errno === "ENOENT") { node.warn(RED._("daemon.errors.notfound")); }
                    else if (err.errno === "EACCES") { node.warn(RED._("daemon.errors.notexecutable")); }
                    else { node.log('error: ' + err); }
                    node.status({fill:"red",shape:"ring",text:RED._("daemon.status.error")});
                });

                node.child.stdin.on('error', function (err) {
                    if (err.errno === "EPIPE") { node.error(RED._("daemon.errors.pipeclosed"),lastmsg); }
                    else { node.log('error: ' + err); }
                    node.status({fill:"red",shape:"ring",text:RED._("daemon.status.error")});
                });
            }
            catch(e) {
                if (e.errno === "ENOENT") { node.warn(RED._("daemon.errors.notfound")); }
                else if (e.errno === "EACCES") { node.warn(RED._("daemon.errors.notexecutable")); }
                else { node.error(e); }
                node.status({fill:"red",shape:"ring",text:RED._("daemon.status.error")});
                node.running = false;
            }
        }