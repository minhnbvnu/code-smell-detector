function SnmpNode(n) {
        const node = this;
        RED.nodes.createNode(node, n);
        initSnmpNode(node, n);
        node.oids = n.oids ? n.oids.replace(/\s/g, "") : "";

        node.on("input", function (msg) {
            const oids = node.oids || msg.oid;
            const { host, sessionid, user, options } = prepareSnmpOptions(node, msg);
            if (oids) {
                let sess = openSession(sessionid, host, user, options);
                sess.on("error", function (err) {
                    node.error(err, msg);
                })
                sess.get(oids.split(","), function (error, varbinds) {
                    if (error) {
                        node.error(error.toString(), msg);
                    } else {
                        for (let i = 0; i < varbinds.length; i++) {
                            let vb = varbinds[i];
                            if (SNMP.isVarbindError(vb)) {
                                node.error(SNMP.varbindError(vb), msg);
                                vb._error = SNMP.varbindError(vb); //add _error to msg so users can determine the varbind is not valid
                            }
                            // else {
                            //     if (vb.type == 4) { vb.value = vb.value.toString(); }
                            // }
                            vb.tstr = SNMP.ObjectType[vb.type];
                        }
                        msg.payload = varbinds;
                        msg.oid = oids;
                        node.send(msg);
                    }
                    closeSession(sessionid); // Needed to close the session else a bad or good read could affect future readings
                });
            } else {
                node.warn("No oid(s) to search for");
            }
        });
    }