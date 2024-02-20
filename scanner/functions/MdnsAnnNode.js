function MdnsAnnNode(n) {
        var mdns = require('mdns');
        var os = require("os");
        if (process.platform === "linux") {
            RED.log.info("You may ignore the warning about Bonjour compatability.");
        }
        RED.nodes.createNode(this, n);
        this.service = n.service || "";
        this.port = n.port;
        this.name = n.name;
        this.txt = n.txt;
        if (this.txt && (this.txt !== '')) {
            try { this.txt = JSON.parse('{'+this.txt+'}'); }
            catch (e) { delete this.txt; }
        }
        var node = this;

        this.on("input", function(msg) {
            if (msg.payload == false) {
                this.stop();
            }
            else {
                var service = node.service || msg.service;
                var port = Number(node.port || msg.port);
                var options = {};
                if (node.name || msg.name) {
                    options.name = (node.name || msg.name).replace(/\%h/g, os.hostname());
                }
                if (node.txt || msg.txtRecord) { options.txtRecord = node.txt || msg.txtRecord }
                this.stop();
                node.ad = mdns.createAdvertisement(service, port, options);
                node.ad.start();
                node.status({fill: "green", shape: "dot"});
            }
        });

        this.on("error", function(e) {
            node.error(e);
        });

        this.on("close", function() {
            this.stop();
        });

        this.stop = function() {
            if (node.ad) {
                node.ad.stop();
                node.status({fill: "red", shape: "ring"});
            }
        }

    }