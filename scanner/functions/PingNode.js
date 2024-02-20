function PingNode(n) {
        RED.nodes.createNode(this,n);
        this.protocol = n.protocol||'Automatic';
        this.mode = n.mode;
        this.host = n.host;
        this.timer = n.timer * 1000;
        this.hadErr = false;
        var node = this;

        function generatePingList(str) {
            return (str + "").split(",").map((e) => (e + "").trim()).filter((e) => e != "");
        }
        function clearPingInterval() {
            if (node.tout) { clearInterval(node.tout); }
        }

        if (node.mode === "triggered") {
            clearPingInterval();
        } else if (node.timer) {
            node.tout = setInterval(function() {
                if (node.hadErr) { node.hadErr = false; node.status({}); }
                let pingables = generatePingList(node.host);
                for (let index = 0; index < pingables.length; index++) {
                    const element = pingables[index];
                    if (element) { doPing(node, element, {}, false); }
                }
            }, node.timer);
        }

        this.on("input", function (msg) {
            let node = this;
            if (node.hadErr) { node.hadErr = false; node.status({}); }
            let payload = node.host || msg.payload;
            if (typeof payload == "string") {
                let pingables = generatePingList(payload)
                for (let index = 0; index < pingables.length; index++) {
                    const element = pingables[index];
                    if (element) { doPing(node, element, RED.util.cloneMessage(msg), false); }
                }
            } else if (Array.isArray(payload) ) {
                for (let index = 0; index < payload.length; index++) {
                    const element = payload[index];
                    if (element) { doPing(node, element, RED.util.cloneMessage(msg), true); }
                }
            }
        });

        this.on("close", function() {
            clearPingInterval();
        });
    }