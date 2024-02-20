function SnmpSubtreeNode(n) {
        const node = this;
        RED.nodes.createNode(node, n);
        initSnmpNode(node, n);
        node.oids = n.oids ? n.oids.replace(/\s/g, "") : ""
        const maxRepetitions = 20;

        node.on("input", function (msg) {
            const oids = node.oids || msg.oid;
            const { host, sessionid, user, options } = prepareSnmpOptions(node, msg);
            const response = [];
            function feedCb(varbinds) {
                for (let i = 0; i < varbinds.length; i++) {
                    if (SNMP.isVarbindError(varbinds[i])) {
                        node.error(SNMP.varbindError(varbinds[i]), msg);
                    } else {
                        response.push({ oid: varbinds[i].oid, value: varbinds[i].value });
                    }
                }
            }
            if (oids) {
                msg.oid = oids;
                let sess = openSession(sessionid, host, user, options);
                sess.on("error", function (err) {
                    node.error(err, msg);
                })
                sess.subtree(msg.oid, maxRepetitions, feedCb, function (error) {
                    if (error) {
                        node.error(error.toString(), msg);
                    } else {
                        msg.payload = response;
                        node.send(msg);
                    }
                    closeSession(sessionid);
                });
            } else {
                node.warn("No oid to search for");
            }
        });
    }