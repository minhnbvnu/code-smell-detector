function AnalogueInputNode(n) {
        RED.nodes.createNode(this, n);
        var node = this;

        // Store local copies of the node configuration (as defined in the .html)
        this.topic = n.topic;
        this.pin = n.pin;                               // The Beaglebone Black pin identifying string
        this._pin = adjustName(this.pin);               // Adjusted for Octal if necessary
        this.breakpoints = n.breakpoints;
        this.averaging = n.averaging;
        if (this.averaging) {
            this.averages = 10;
        }
        else {
            this.averages = 1;
        }

        // Variables used for input averaging
        var sum;    // accumulates the input readings to be averaged
        var count;  // keep track of the number of measurements made

        // The callback function for analogRead. Accumulates the required number of
        // measurements, then divides the total number, applies output scaling and
        // sends the result
        var analogReadCallback = function (err, x) {
            sum = sum + Number(x);
            count = count - 1;
            if (count > 0) {
                bonescript.analogRead(node._pin, analogReadCallback);
            }
            else {
                var msg = {};
                msg.topic = node.topic;
                sum = sum/node.averages;
                // i is the index of the first breakpoint where the 'input' value is strictly
                // greater than the measurement (note: a measurement can never be == 1)
                var i = node.breakpoints.map(function (breakpoint) {
                    return sum >= breakpoint.input;
                }).indexOf(false);
                msg.payload = node.breakpoints[i - 1].output + (node.breakpoints[i].output - node.breakpoints[i - 1].output)*
                (sum - node.breakpoints[i - 1].input)/(node.breakpoints[i].input - node.breakpoints[i - 1].input);
                node.send(msg);
            }
        };

        // If we have a valid pin, set the input event handler to Bonescript's analogRead
        if (analogInputPins.indexOf(node.pin) >= 0) {
            node.on("input", function () {
                sum = 0;
                count = node.averages;
                bonescript.analogRead(node._pin, analogReadCallback);
            });
        }
        else {
            node.error("Unconfigured input pin");
        }
    }