function Beacon(n) {
        RED.nodes.createNode(this,n);
        var node = this;
        node.mode = n.mode;
        node.power = n.power;
        node.period = n.period;
        node.count = n.count;
        node.url = n.url;
        node.namespace = n.namespace;
        node.instance = n.instance;

        node.options = {
            txPowerLevel: node.power,
            tlmPeriod: node.period,
            tlmCount: node.count
        };

        if (node.mode === "url" && node.url) {
            if (!eddyBeacon) {
                eddyBeacon = true;
                try {
                    eddystoneBeacon.advertiseUrl(node.url, node.options);
                    node.status({fill:"green",shape:"dot",text:node.url});
                }
                catch(e) {
                    node.error('Error setting beacon URL', e);
                }
            }
            else {node.warn('Beacon already in use');}
        }

        if (node.mode === "uid") {
            if (!eddyBeacon) {
                eddyBeacon = true;
                try {
                    eddystoneBeacon.advertiseUid(node.namespace, node.instance, node.options);
                    node.status({fill:"green",shape:"dot",text:node.namespace});
                }
                catch(e) {
                    node.error('Error setting beacon information', e);
                }
            }
            else {node.warn('Beacon already in use');}
        }

        node.on('input', function(msg) {
            if (msg.advertising === false) {
                if (eddyBeacon) {
                    try {
                        eddystoneBeacon.stop();
                        node.status({fill:"red",shape:"dot",text:"Stopped"});
                    }
                    catch(e) {
                        node.error('error shutting down beacon', e);
                    }
                    return;
                }
            }
            if (msg.advertising === true) {
                if (node.mode === "url") {
                    try {
                        eddystoneBeacon.advertiseUrl(node.url, node.options);
                        node.status({fill:"green",shape:"dot",text:node.url});
                    }
                    catch(e) {
                        node.error('Error setting beacon URL', e);
                    }
                    return;
                }
                if (node.mode === "uid") {
                    try {
                        eddystoneBeacon.advertiseUid(node.namespace, node.instance, node.options);
                        node.status({fill:"green",shape:"dot",text:node.namespace});
                    }
                    catch(e) {
                        node.error('Error setting beacon information', e);
                    }
                    return;
                }
            }
            // url mode
            if (node.mode === "url") {
                if (checkLength(msg.payload) <= 18) {
                    try {
                        node.url = msg.payload;
                        eddystoneBeacon.advertiseUrl(node.url, node.options);
                        node.status({fill:"green",shape:"dot",text:node.url});
                    }
                    catch(e) {
                        node.status({fill:"red",shape:"dot",text:"Error setting URL"});
                        node.error('error updating beacon URL', e);
                    }
                }
                else {
                    node.status({fill:"red",shape:"dot",text:"URL too long"});
                }
            }
            // uid mode
            else {
                try {
                    node.namespace = msg.payload;
                    node.instance = msg.topic;
                    eddystoneBeacon.advertiseUid(node.namespace, node.instance, node.options);
                    node.status({fill:"green",shape:"dot",text:msg.payload});
                }
                catch(e) {
                    node.status({fill:"red",shape:"dot",text:"Error setting beacon information"});
                    node.error('Error setting beacon information', e);
                }
            }
        });

        node.on('close', function(done) {
            eddyBeacon = false;
            try {
                node.status({});
                eddystoneBeacon.stop();
                done();
            }
            catch(e) {
                node.error('error shutting down beacon', e);
            }
        });

    }