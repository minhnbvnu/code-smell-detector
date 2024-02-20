function DiscreteOutputNode(n) {
        RED.nodes.createNode(this, n);
        var node = this;

        // Store local copies of the node configuration (as defined in the .html)
        this.topic = n.topic;                           // the topic is not currently used
        this.pin = n.pin;                               // The Beaglebone Black pin identifying string
        this._pin = adjustName(this.pin);               // Adjusted for Octal if necessary
        this.defaultState = Number(n.defaultState);     // What state to set up as
        this.inverting = n.inverting;
        this.toggle = n.toggle;

        // Working variables
        this.currentState = this.defaultState;

        // If the input message payload is numeric, values > 0.5 are 'true', otherwise use
        // the truthiness of the payload. Apply the inversion flag before setting the output
        var inputCallback = function (msg) {
            var newState;
            if (node.toggle) {
                newState = node.currentState === 0 ? 1 : 0;
            }
            else {
                if (isFinite(Number(msg.payload))) {
                    newState = Number(msg.payload) > 0.5;
                }
                else if (msg.payload) {
                    newState = true;
                }
                else {
                    newState = false;
                }
                if (node.inverting) {
                    newState = !newState;
                }
            }
            bonescript.digitalWrite(node._pin, newState ? 1 : 0, function() {
                node.send({topic: node.topic, payload: newState});
                node.currentState = newState;
            });
        };

        // If we have a valid pin, set it as an output and set the default state
        if (gpioPins.concat(usrLEDs).indexOf(node.pin) >= 0) {
            // Don't set up interrupts & intervals until after the close event handler has been installed
            if (node._pin) { bonescript.detachInterrupt(node._pin); }
            process.nextTick(function () {
                setPinMode(node._pin, bonescript.OUTPUT, function (response, pin) {
                    if (response) {
                        node.error("Unable to set " + pin + " as output: " + response.err);
                    }
                    else {
                        node.on("input", inputCallback);
                        setTimeout(function () {
                            bonescript.digitalWrite(node._pin, node.defaultState, function() {});
                        }, 50);
                    }
                });
            });
        }
        else {
            node.error("Unconfigured output pin");
        }
    }