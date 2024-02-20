function Blink1InNode(n) {
        RED.nodes.createNode(this,n);
        this.serial = n.serial;
        if (!this.serial) { delete this.serial; }
        var node = this;

        try {
            this.on("input", function(msg) {
                try {
                    blink1[node.serial||"one"] = blink1[node.serial||"one"] || new Blink1.Blink1(node.serial);
                    node.status({text:node.serial});
                    if (blink1[node.serial||"one"]) {
                        var that = this;

                        var returnRgb = function (r,g,b){
                            var rgb = [r,g,b];
                            var payload = rgb.every(el => el === 0) ? "off" : rgb;
                            msg.payload = payload;
                            that.send(msg);
                        };

                        try {
                            var device = blink1[node.serial||"one"];
                            device.rgb(returnRgb);
                        }
                        catch (e) { node.error("Blink1 : error | " + e); blink1[node.serial||"one"] = null; }
                    }
                    else { node.warn("Blink1 : not found"); }
                }
                catch (e) { node.error("Blink1 : device not found"); blink1[node.serial||"one"] = null; }
            });
            this.on("close", function(done) {
                if (blink1[node.serial||"one"] && typeof blink1[node.serial||"one"].close === "function") {
                    blink1[node.serial||"one"].close(function() { done() });
                }
                else { done(); }
                blink1[node.serial||"one"] = null;
            });
        }
        catch(e) {
            node.error("No Blink1 found (" + e + ")");
        }
    }