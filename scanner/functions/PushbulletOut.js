function PushbulletOut(n) {
        RED.nodes.createNode(this, n);
        this.title = n.title;
        this.chan = n.chan;
        this.pushtype = n.pushtype;
        this.pusher = null;
        var self = this;

        var configNode;

        this.status({});
        configNode = RED.nodes.getNode(n.config);
        try {
            this.deviceid = this.credentials.deviceid;
        }
        catch(err) { }

        if (configNode) {
            configNode.initialise();
            this.pusher = configNode.pusher;
            configNode.onConfig('error', function(err) {
                self.error(err);
            });
        }

        this.on("input", function(msg) {
            var title = self.title || msg.topic || "Node-RED";
            var deviceid = (self.deviceid === '_msg_')? (msg.deviceid || ""): (self.deviceid || "");
            var pushtype = self.pushtype || msg.pushtype || "note";
            var channel = self.chan || msg.channel;

            if (typeof(msg.payload) === 'object') {
                msg.payload = JSON.stringify(msg.payload);
            }
            else if (msg.payload) {
                msg.payload = msg.payload.toString();
            }

            if (['delete', 'dismissal', 'updatelist', '_rawupdate_'].indexOf(pushtype) === -1) {
                if (channel) {
                    deviceid = { channel_tag : channel };
                }
                else if (deviceid === "") {
                    try {
                        when(configNode.me).then(function(me) {
                            if (me) {
                                deviceid = me.email;
                                self.pushMsg(pushtype, deviceid, title, msg);
                            }
                            else {
                                self.error("Unable to push",msg);
                            }
                        });
                        return;
                    }
                    catch(err) {
                        self.error('Unable to push to "all".');
                    }
                }
                else if (!isNaN(deviceid)) {
                    deviceid = Number(deviceid);
                }
            }
            self.pushMsg(pushtype, deviceid, title, msg);
        });
    }