function RedisOutNode(n) {
        RED.nodes.createNode(this,n);
        this.port = n.port||"6379";
        this.hostname = n.hostname||"127.0.0.1";
        this.key = n.key;
        this.structtype = n.structtype;

        this.client = redisConnectionPool.get(this.hostname,this.port);

        if (this.client.connected) {
            this.status({fill:"green",shape:"dot",text:"node-red:common.status.connected"});
        }
        else {
            this.status({fill:"red",shape:"ring",text:"node-red:common.status.disconnected"},true);
        }

        var node = this;
        this.client.on("end", function() {
            node.status({fill:"red",shape:"ring",text:"node-red:common.status.disconnected"});
        });
        this.client.on("connect", function() {
            node.status({fill:"green",shape:"dot",text:"node-red:common.status.connected"});
        });

        this.on("input", function(msg) {
            var k = this.key || msg.topic;
            if (k) {
                if (this.structtype == "string") {
                    this.client.set(k,RED.util.ensureString(msg.payload));
                }
                else if (this.structtype == "hash") {
                    if (typeof msg.payload == "object") {
                        this.client.hmset(k,msg.payload);
                    }
                    else {
                        var r = hashFieldRE.exec(msg.payload);
                        if (r) {
                            this.client.hset(k,r[1],r[2]);
                        }
                        else {
                            this.warn(RED._("redisout.errors.invalidpayload"));
                        }
                    }
                }
                else if (this.structtype == "set") {
                    this.client.sadd(k,msg.payload);
                }
                else if (this.structtype == "list") {
                    this.client.rpush(k,msg.payload);
                }
            }
            else {
                this.warn(RED._("redisout.errors.nokey"));
            }
        });
        this.on("close", function() {
            redisConnectionPool.close(node.client);
        });
    }