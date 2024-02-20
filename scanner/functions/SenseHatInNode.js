function SenseHatInNode(n) {
        RED.nodes.createNode(this,n);
        this.motion = n.motion;
        this.env = n.env;
        this.stick = n.stick;
        var node = this;
        node.status({fill:"red",shape:"ring",text:"node-red:common.status.disconnected"});
        HAT.open(this);

        node.on("close", function(done) {
            HAT.close(this,done);
        });
    }