function PulseInputNode(n) {
        RED.nodes.createNode(this, n);
        var node = this;

        // Store local copies of the node configuration (as defined in the .html)
        this.topic = n.topic;                           // the topic is not currently used
        this.pin = n.pin;                               // The Beaglebone Black pin identifying string
        this._pin = adjustName(this.pin);               // Adjusted for Octal if necessary
        this.updateInterval = n.updateInterval*1000;    // How often to send output messages
        this.countType = n.countType;                   // Sets either 'edge' or 'pulse' counting
        this.countUnit = n.countUnit;                   // Scaling applied to count output
        this.countRate = n.countRate;                   // Scaling applied to rate output

        // Working variables
        this.interruptAttached = false;                 // Flag: should we detach interrupt when we are closed?
        this.intervalId = null;                         // Remember the timer ID so we can delete it when we are closed
        this.pulseCount = 0;                            // (Unscaled) total pulse count
        // Hold the hrtime of the last two pulses (with ns resolution)
        this.pulseTime = [[NaN, NaN], [NaN, NaN]];

        // Called by the edge or pulse interrupt. Record the pulse time and count the pulse
        // Note: if x has an 'attached' field and no 'value' field, the callback is reporting
        // the success or failure of attaching the interrupt - we must handle this
        var interruptCallback = function (x) {
            if (x === undefined) {
                if (x.attached === true) {
                    node.interruptAttached = true;
                    node.on("input", inputCallback);
                    node.intervalId = setInterval(timerCallback, node.updateInterval);
                }
                else {
                    node.error("Failed to attach interrupt");
                }
            }
            else {
                node.pulseTime = [node.pulseTime[1], process.hrtime()];
                node.pulseCount = node.pulseCount + 1;
            }
        };

        // Called when an input message arrives. If the topic contains 'load' (case
        // insensitive) and the payload is a valid number, set the count to that
        // number, otherwise set it to zero
        var inputCallback = function (msg) {
            if (String(msg.topic).search(/load/i) < 0 || isFinite(msg.payload) === false) {
                node.pulseCount = 0;
            }
            else {
                node.pulseCount = Number(msg.payload);
            }
        };

        // Called by the message timer. Send two messages: the scaled pulse count on
        // the first output and the scaled instantaneous pulse rate on the second.
        // The instantaneous pulse rate is the reciprocal of the larger of either the
        // time interval between the last two pulses, or the time interval since the last pulse.
        var timerCallback = function () {
            var now = process.hrtime();
            var lastTime = node.pulseTime[1][0] - node.pulseTime[0][0] + (node.pulseTime[1][1] - node.pulseTime[0][1])/1e9;
            var thisTime = now[0] - node.pulseTime[1][0] + (now[1] - node.pulseTime[1][1])/1e9;
            var msg = [{topic: node.topic}, {topic: node.topic}];
            msg[0].payload = node.countUnit*node.pulseCount;
            // At startup, pulseTime contains NaN's: force the rate output to 0
            msg[1].payload = node.countRate/Math.max(thisTime, lastTime) || 0;
            node.send(msg);
        };

        // If we have a valid pin, set it as an input and read the (digital) state
        if (gpioPins.indexOf(node.pin) >= 0) {
            // Don't set up interrupts & intervals until after the close event handler has been installed
            bonescript.detachInterrupt(node._pin);
            process.nextTick(function () {
                setPinMode(node._pin, bonescript.INPUT, function (response, pin) {
                    if (!response) {
                        bonescript.digitalRead(node._pin, function (err, x) {
                            // Initialise the currentState based on the value read
                            node.currentState = Number(x);
                            // Attempt to attach an interrupt handler to the pin. If we succeed,
                            // set the input event and interval handlers
                            var interruptType;
                            if (node.countType === "pulse") {
                                // interruptType = bonescript.FALLING; <- doesn't work in v0.2.4
                                interruptType = bonescript.RISING;
                            }
                            else {
                                interruptType = bonescript.CHANGE;
                            }
                            // Attempt to attach the required interrupt handler to the pin. If we succeed,
                            // the input event and interval handlers will be installed by interruptCallback
                            bonescript.attachInterrupt(node._pin, interruptType, interruptCallback)
                        });
                    }
                    else {
                        node.error("Unable to set " + pin + " as input: " + response);
                    }
                });
            });
        }
        else {
            node.error("Unconfigured input pin");
        }
    }