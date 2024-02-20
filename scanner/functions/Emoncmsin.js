function Emoncmsin(n) {
        RED.nodes.createNode(this,n);
        this.emonServer = n.emonServer;
        var sc = RED.nodes.getNode(this.emonServer);

        this.baseurl = sc.server;
        this.apikey = sc.credentials.apikey;

        this.feedid = n.feedid
        var node = this;
        var http;
        if (this.baseurl.substring(0,5) === "https") { http = require("https"); }
        else { http = require("http"); }
        this.on("input", function(msg) {
            this.url = this.baseurl + '/feed/aget.json';
            this.url += '&apikey='+this.apikey;
            var feedid = this.feedid || msg.feedid;
            if (feedid !== "") {
                this.url += '&id=' + feedid;
            }
            http.get(this.url, function(res) {
                msg.rc = res.statusCode;
                msg.payload = "";
                msg.feed_data = "";
                res.setEncoding('utf8');
                res.on('data', function(chunk) {
                    msg.feed_data += chunk;
                });
                res.on('end', function() {
                    if (msg.rc === 200) {
                        try {
                            msg.feed_data = JSON.parse(msg.feed_data);
                            msg.topic = msg.feed_data.name;
                            msg.payload = msg.feed_data.value;
                        }
                        catch(err) {
                            // Failed to parse, pass it on
                        }
                        node.send(msg);
                    }
                });
            }).on('error', function(e) {
                node.error(e,msg);
            });
        });
    }