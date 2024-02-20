function WordPOSNode(n) {
        RED.nodes.createNode(this,n);
        this.on("input", function(msg) {
            var node = this;
            wordpos.getPOS(msg.payload, function (result) {
                msg.pos = result;
                node.send(msg);
            });
        });
    }