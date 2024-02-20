function HeatmiserInputNode(n) {
        // TODO - holiday and hot water cases when confirmed working
        var DEBUG = false;
        RED.nodes.createNode(this,n);
        this.ip = n.ip || "192.168.0.1";
        this.pin = n.pin || "1234";
        this.pollTime = n.pollTime*60*1000 || 30*60*1000;
        this.pollIntervalRef = undefined;
        var hmoutnode = this;

        this.hm = new Heatmiser.Wifi(this.ip, this.pin);

        this.hm.on('success', function(data) {
            if (DEBUG) {
                hmoutnode.log("Successfully wrote data. Response : " + JSON.stringify(data));
            }
            hmoutnode.send({topic: "", payload:JSON.stringify(data.dcb)});
        });
        this.hm.on('error', function(data) {
            if (DEBUG) {
                hmoutnode.log("Error during data setting : " + JSON.stringify(data));
            }
            hmoutnode.send(data);
        });

        this.read = function() {
            if (hmoutnode.hm) {
                hmoutnode.hm.read_device();
            }
        };

        if (!this.currentStatus) {
            this.read();
            this.pollIntervalRef = setInterval(this.read, this.pollTime);
        }

        this.on("close", function() {
            if (this.pollIntervalRef) {
                clearInterval(this.pollIntervalRef);
                this.pollIntervalRef = undefined;
            }
        });

        this.on("input", function(message) {
            // Valid inputs are heating:{target:, hold:}, read:, runmode:frost/heating, holiday:{enabled:, time:}, hotwater:{'on':1/0 / 'boost':1/0}
            if (message.payload == "undefined" || !message.payload) {
                message.payload = {read : true};
            }
            if (typeof(message.payload) == "string") {
                message.payload = JSON.parse(message.payload);
            }
            if (message.payload.read) {
                hmoutnode.read();
            }
            else if (message.payload) {
                // Compare message.payload data to confirm valid and send to thermostat
                var validInputs = ["heating", "runmode"];
                for (var key in message.payload) {
                    if (message.payload.hasOwnProperty(key)) {
                        if (validInputs.indexOf(key) < 0) {
                            hmoutnode.log("Warning: Unsupported key ("+key+") passed!");
                            return;
                        }
                    }
                }
                hmoutnode.validateAndWrite(message);
            }
        });
    }