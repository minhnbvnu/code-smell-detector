function EmoncmsServerNode(n) {
        RED.nodes.createNode(this,n);
        this.server = n.server;
        this.name = n.name;
    }