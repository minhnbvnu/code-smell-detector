function PusherNode(n) {
        RED.nodes.createNode(this, n);
        this.channel = n.channel;
        this.eventname = n.eventname;
        this.cluster = n.cluster || "mt1";
        var node = this;
        var credentials = this.credentials;

        if ((credentials) && (credentials.hasOwnProperty("pusherappkeysub"))) {
            node.appkey = credentials.pusherappkeysub;
        }
        else { this.error("No Pusher app key set for input node"); }

        //create a subscription to the channel and event defined by user
        // var socket = new PusherClient(''+node.appkey, {cluster:node.cluster, encrypted:true});
        const pusher = new PusherClient('' + node.appkey, {
            cluster: node.cluster
        });
        const channel = pusher.subscribe('' + node.channel);

        channel.bind('' + node.eventname, function (data) {
            var msg = { topic: node.eventname, channel: node.channel };
            if (data.hasOwnProperty("payload")) { msg.payload = data.payload; }
            else { msg.payload = data; }
            node.send(msg);
        });

        node.on("close", function () {
            pusher.disconnect();
        });
    }