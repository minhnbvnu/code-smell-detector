function LevelDBNodeIn(n) {
        RED.nodes.createNode(this,n);
        this.level = n.level;
        this.levelConfig = RED.nodes.getNode(this.level);

        var node = this;
        node.on("input", function(msg) {
            if (node.levelConfig && node.levelConfig.ready) {
                var key = msg.topic.toString();
                if (key && (key.length > 0)) {
                    node.levelConfig.db.get(msg.topic, function(err, value) {
                        if (err) {
                            //node.warn(err);
                            // for some reason they treat nothing found as an error...
                            msg.payload = null;  // so we should return null
                        }
                        else { msg.payload = value; }
                        node.send(msg);
                    });
                }
                else { node.error("Cannot make key string from msg.topic"); }
            }
            else { node.error("Database not ready",msg); }
        });
    }