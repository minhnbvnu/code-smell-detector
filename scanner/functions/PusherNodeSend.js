function PusherNodeSend(n) {
        // Create a RED node
        RED.nodes.createNode(this, n);

        var node = this;
        var credentials = this.credentials;

        if ((credentials) && (credentials.hasOwnProperty("pusherappid"))) { this.appid = credentials.pusherappid; }
        else { this.error("No Pusher api token set"); }
        if ((credentials) && (credentials.hasOwnProperty("pusherappsecret"))) { this.appsecret = credentials.pusherappsecret; }
        else { this.error("No Pusher user secret set"); }
        if ((credentials) && (credentials.hasOwnProperty("pusherappkey"))) { this.appkey = credentials.pusherappkey; }
        else { this.error("No Pusher user key set"); }

        //get parameters from user
        this.channel = n.channel;
        this.eventname = n.eventname;
        this.cluster = n.cluster || "mt1";

        var pusher = new Pusher({
            appId: this.appid,
            key: this.appkey,
            secret: this.appsecret,
            cluster: this.cluster
        });

        

        node.on("input", function (msg) {
            pusher.trigger(this.channel, this.eventname, {
                "payload": msg.payload
            });
        });

        node.on("close", function () {
        });
    }