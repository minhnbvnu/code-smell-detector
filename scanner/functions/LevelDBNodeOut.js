function LevelDBNodeOut(n) {
        RED.nodes.createNode(this,n);
        this.level = n.level;
        this.operation = n.operation;
        this.levelConfig = RED.nodes.getNode(this.level);

        var node = this;
        node.on("input", function(msg) {
            if (node.levelConfig && node.levelConfig.ready) {
                var key = msg.topic.toString();
                if (key && (key.length > 0)) {
                    if (node.operation === "delete") {
                        node.levelConfig.db.del(msg.topic);
                    }
                    else {
                        node.levelConfig.db.put(msg.topic, msg.payload, function(err) {
                            if (err) { node.error(err,msg); }
                        });
                    }
                }
                else { node.error("Cannot make key string from msg.topic",msg); }
            }
            else { node.error("Database not ready",msg); }
        });
    }