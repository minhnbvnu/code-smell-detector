function SnmpSNode(n) {
        const node = this;
        RED.nodes.createNode(node, n);
        initSnmpNode(node, n);
        node.varbinds = n.varbinds;
        if (node.varbinds && node.varbinds.trim().length === 0) { delete node.varbinds; }
        node.on("input", function (msg) {
            const { host, sessionid, user, options } = prepareSnmpOptions(node, msg);
            const varbinds = (node.varbinds) ? JSON.parse(node.varbinds) : msg.varbinds;
            if (varbinds) {
                for (let i = 0; i < varbinds.length; i++) {
                    varbinds[i].type = SNMP.ObjectType[varbinds[i].type];
                }
                let sess = openSession(sessionid, host, user, options);
                sess.on("error", function (err) {
                    node.error(err, msg);
                })
                sess.set(varbinds, function (error, varbinds) {
                    if (error) {
                        node.error(error.toString(), msg);
                    } else {
                        for (let i = 0; i < varbinds.length; i++) {
                            // for version 2c we must check each OID for an error condition
                            if (SNMP.isVarbindError(varbinds[i])) {
                                node.error(SNMP.varbindError(varbinds[i]), msg);
                            }
                        }
                    }
                    closeSession(sessionid);
                });
            } else {
                node.warn("No varbinds to set");
            }
        });

    }