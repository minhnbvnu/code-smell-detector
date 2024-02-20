function MongoInNode(n) {
        RED.nodes.createNode(this,n);
        this.collection = n.collection;
        this.mongodb = n.mongodb;
        this.operation = n.operation || "find";
        this.mongoConfig = RED.nodes.getNode(this.mongodb);
        this.status({fill:"grey",shape:"ring",text:RED._("mongodb.status.connecting")});
        var node = this;
        var noerror = true;

        var connectToDB = function() {
            console.log("connecting:  " + node.mongoConfig.url);
            MongoClient.connect(node.mongoConfig.url, function(err,client) {
                if (err) {
                    node.status({fill:"red",shape:"ring",text:RED._("mongodb.status.error")});
                    if (noerror) { node.error(err); }
                    noerror = false;
                    node.tout = setTimeout(connectToDB, 10000);
                }
                else {
                    node.status({fill:"green",shape:"dot",text:RED._("mongodb.status.connected")});
                    node.client = client;
                    var db = client.db();
                    noerror = true;
                    var coll;
                    node.on("input", function(msg) {
                        if (!node.collection) {
                            if (msg.collection) {
                                coll = db.collection(msg.collection);
                            }
                            else {
                                node.error(RED._("mongodb.errors.nocollection"));
                                return;
                            }
                        }
                        else {
                            coll = db.collection(node.collection);
                        }
                        var selector;
                        if (node.operation === "find") {
                            msg.projection = msg.projection || {};
                            selector = ensureValidSelectorObject(msg.payload);
                            var limit = msg.limit;
                            if (typeof limit === "string" && !isNaN(limit)) {
                                limit = Number(limit);
                            } else if (typeof limit === "undefined") {
                                limit = 0;
                            }
                            var skip = msg.skip;
                            if (typeof skip === "string" && !isNaN(skip)) {
                                skip = Number(skip);
                            } else if (typeof skip === "undefined") {
                                skip = 0;
                            }

                            coll.find(selector).project(msg.projection).sort(msg.sort).limit(limit).skip(skip).toArray(function(err, items) {
                                if (err) {
                                    node.error(err);
                                }
                                else {
                                    msg.payload = items;
                                    delete msg.projection;
                                    delete msg.sort;
                                    delete msg.limit;
                                    delete msg.skip;
                                    node.send(msg);
                                }
                            });
                        }
                        else if (node.operation === "count") {
                            selector = ensureValidSelectorObject(msg.payload);
                            coll.count(selector, function(err, count) {
                                if (err) {
                                    node.error(err);
                                }
                                else {
                                    msg.payload = count;
                                    node.send(msg);
                                }
                            });
                        }
                        else if (node.operation === "aggregate") {
                            msg.payload = (Array.isArray(msg.payload)) ? msg.payload : [];
                            coll.aggregate(msg.payload, function(err, cursor) {
                                if (err) {
                                    node.error(err);
                                }
                                else {
                                     cursor.toArray(function(cursorError, cursorDocs) {
                                       //console.log(cursorDocs);
                                       if (cursorError) {
                                         node.error(cursorError);
                                       }
                                       else {
                                         msg.payload = cursorDocs;
                                         node.send(msg);
                                       }
                                     });
                                }
                            });
                        }
                    });
                }
            });
        }

        if (node.mongoConfig) { connectToDB(); }
        else { node.error(RED._("mongodb.errors.missingconfig")); }

        node.on("close", function() {
            node.status({});
            if (node.tout) { clearTimeout(node.tout); }
            if (node.client) { node.client.close(); }
        });
    }