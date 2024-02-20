function SnmpTNode(n) {
        const node = this;
        RED.nodes.createNode(node, n);
        initSnmpNode(node, n);
        node.oids = n.oids ? n.oids.replace(/\s/g, "") : ""
        const maxRepetitions = 20;

        function sortInt(a, b) {
            if (a > b) { return 1; }
            else if (b > a) { return -1; } else { return 0; }
        }

        node.on("input", function (msg) {
            const oids = node.oids || msg.oid;
            const { host, sessionid, user, options } = prepareSnmpOptions(node, msg);
            if (oids) {
                msg.oid = oids;
                let sess = openSession(sessionid, host, user, options);
                sess.on("error", function (err) {
                    node.error(err, msg);
                })
                sess.table(oids, maxRepetitions, function (error, table) {
                    if (error) {
                        node.error(error.toString(), msg);
                    } else {
                        const indexes = [];
                        for (let index in table) {
                            if (table.hasOwnProperty(index)) {
                                indexes.push(parseInt(index));
                            }
                        }
                        indexes.sort(sortInt);
                        for (let i = 0; i < indexes.length; i++) {
                            const columns = [];
                            for (let column in table[indexes[i]]) {
                                if (table[indexes[i]].hasOwnProperty(column)) {
                                    columns.push(parseInt(column));
                                }
                            }
                            columns.sort(sortInt);
                        }
                        msg.payload = table;
                        node.send(msg);
                    }
                    closeSession(sessionid);
                });
            } else {
                node.warn("No oid to search for");
            }
        });
    }