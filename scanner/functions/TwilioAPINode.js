function TwilioAPINode(n) {
        RED.nodes.createNode(this,n);
        this.sid = n.sid;
        this.from = n.from;
        this.name = n.name;
        var credentials = this.credentials;
        if (credentials) { this.token = credentials.token; }
    }