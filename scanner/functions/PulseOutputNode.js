function PulseOutputNode(n) {
        RED.nodes.createNode(this, n);
        var node = this;

        // Store local copies of the node configuration (as defined in the .html)
        this.topic = n.topic;                           // the topic is not currently used
        this.pin = n.pin;                               // The Beaglebone Black pin identifying string
        this._pin = adjustName(this.pin);               // Adjusted for Octal if necessary
        this.pulseState = Number(n.pulseState);         // What state the pulse will be..
        this.defaultState = this.pulseState === 1 ? 0 : 1;
        this.retriggerable = n.retriggerable;
        this.pulseTime = n.pulseTime*1000;              // Pulse width in milliseconds

        // Working variables
        this.pulseTimer = null;                         // Non-null while a pulse is being generated

        // Generate a pulse in response to an input message. If the topic includes the text
        // 'time' (case insensitive) and the payload is numeric, use this value as the
        // pulse time. Otherwise use the value from the properties dialog.
        // If the resulting pulse time is < 1ms, do nothing.
        // If the pulse mode is not retriggerable, then if no pulseTimer is active, generate
        // a pulse. If the pulse mode is retriggerable, and a pulseTimer is active, cancel it.
        // If no timer is active, set the pulse output. In both cases schedule a new pulse
        // timer.
        var inputCallback = function (msg) {
            var time = node.pulseTime;
            if (String(msg.topic).search(/time/i) >= 0 && isFinite(msg.payload)) {
                time = msg.payload*1000;
            }
            if (time >= 1) {
                if (node.retriggerable === false) {
                    if (node.pulseTimer === null) {
                        node.pulseTimer = setTimeout(endPulseCallback, time);
                        bonescript.digitalWrite(node._pin, node.pulseState, function() {
                            node.send({topic: node.topic, payload: node.pulseState});
                        });
                    }
                }
                else {
                    if (node.pulseTimer !== null) {
                        clearTimeout(node.pulseTimer);
                    }
                    else {
                        bonescript.digitalWrite(node._pin, node.pulseState, function() {
                            node.send({topic: node.topic, payload: node.pulseState});
                        });
                    }
                    node.pulseTimer = setTimeout(endPulseCallback, time);
                }
            }
        };

        // At the end of the pulse, restore the default state and set the timer to null
        var endPulseCallback = function () {
            node.pulseTimer = null;
            bonescript.digitalWrite(node._pin, node.defaultState, function() {
                node.send({topic: node.topic, payload: node.defaultState});
            });
        };

        // If we have a valid pin, set it as an output and set the default state
        if (gpioPins.concat(usrLEDs).indexOf(node.pin) >= 0) {
            // Don't set up interrupts & intervals until after the close event handler has been installed
            bonescript.detachInterrupt(node._pin);
            process.nextTick(function () {
                setPinMode(node._pin, bonescript.OUTPUT, function (response, pin) {
                    if (!response) {
                        node.on("input", inputCallback);
                        // Set the pin to the default state once the dust settles
                        setTimeout(endPulseCallback, 50);
                    }
                    else {
                        node.error("Unable to set " + pin + " as output: " + response.err);
                    }
                });
            });
        }
        else {
            node.error("Unconfigured output pin");
        }
    }