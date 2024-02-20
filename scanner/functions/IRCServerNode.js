function IRCServerNode(n) {
        RED.nodes.createNode(this,n);
        this.server = n.server;
        this.port = n.port || 6667;
        this.ssl = n.ssl || false;
        this.cert = n.cert || false;
        this.channel = n.channel;
        this.nickname = n.nickname;
        this.lastseen = 0;
        this.ircclient = null;
        this.on("close", function() {
            if (this.ircclient != null) {
                this.ircclient.removeAllListeners();
                this.ircclient.disconnect();
            }
        });

        this.username = null;
        this.password = null;
        if (this.credentials && this.credentials.hasOwnProperty("username")) {
            this.username = this.credentials.username;
        }
        if (this.credentials && this.credentials.hasOwnProperty("password")) {
            this.password = this.credentials.password;
        }

    }