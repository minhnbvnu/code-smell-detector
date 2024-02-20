function MysqlDBNodeIn(n) {
        RED.nodes.createNode(this,n);
        this.mydb = n.mydb;
        this.mydbConfig = RED.nodes.getNode(this.mydb);
        this.status({});

        if (this.mydbConfig) {
            this.mydbConfig.connect();
            var node = this;
            var busy = false;
            var status = {};
            node.mydbConfig.on("state", function(info) {
                if (info === "connecting") { node.status({fill:"grey",shape:"ring",text:info}); }
                else if (info === "connected") { node.status({fill:"green",shape:"dot",text:info}); }
                else {
                    node.status({fill:"red",shape:"ring",text:info});
                }
            });

            node.on("input", function(msg, send, done) {
                send = send || function() { node.send.apply(node,arguments) };
                if (node.mydbConfig.connected) {
                    if (typeof msg.topic === 'string') {
                        //console.log("query:",msg.topic);
                        node.mydbConfig.pool.getConnection(function (err, conn) {
                            if (err) {
                                if (conn) {
                                    conn.release()
                                }
                                status = { fill: "red", shape: "ring", text: RED._("mysql.status.error") + ": " + err.code };
                                node.status(status);
                                node.error(err, msg);
                                if (done) { done(); }
                                return
                            }

                            var bind = [];
                            if (Array.isArray(msg.payload)) {
                                bind = msg.payload;
                            }
                            else if (typeof msg.payload === 'object' && msg.payload !== null) {
                                bind = msg.payload;
                            }
                            conn.config.queryFormat = Array.isArray(msg.payload) ? null : customQueryFormat
                            conn.query(msg.topic, bind, function (err, rows) {
                                conn.release()
                                if (err) {
                                    status = { fill: "red", shape: "ring", text: RED._("mysql.status.error") + ": " + err.code };
                                    node.status(status);
                                    node.error(err, msg);
                                }
                                else {
                                    msg.payload = rows;
                                    send(msg);
                                    status = { fill: "green", shape: "dot", text: RED._("mysql.status.ok") };
                                    node.status(status);
                                }
                                if (done) { done(); }
                            });
                        })

                    }
                    else {
                        if (typeof msg.topic !== 'string') { node.error("msg.topic : "+RED._("mysql.errors.notstring")); done(); }
                    }
                }
                else {
                    node.error(RED._("mysql.errors.notconnected"),msg);
                    status = {fill:"red",shape:"ring",text:RED._("mysql.status.notconnected")};
                    if (done) { done(); }
                }
                if (!busy) {
                    busy = true;
                    node.status(status);
                    node.tout = setTimeout(function() { busy = false; node.status(status); },500);
                }
            });

            node.on('close', function() {
                if (node.tout) { clearTimeout(node.tout); }
                node.mydbConfig.removeAllListeners();
                node.status({});
            });
        }
        else {
            this.error(RED._("mysql.errors.notconfigured"));
        }
    }