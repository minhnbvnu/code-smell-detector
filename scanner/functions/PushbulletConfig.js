function PushbulletConfig(n) {
        RED.nodes.createNode(this, n);
        this.n = n;
        this.name = n.name;
        this._inputNodes = [];
        this.initialised = false;
    }