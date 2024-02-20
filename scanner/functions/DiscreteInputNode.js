function DiscreteInputNode(n) {
        RED.nodes.createNode(this, n);
        var node = this;

        // Store local copies of the node configuration (as defined in the .html)
        this.topic = n.topic;                           // the topic is not currently used
        this.pin = n.pin;                               // The Beaglebone Black pin identifying string
        this._pin = adjustName(this.pin);               // Adjusted for Octal if necessary
        if (n.activeLow) {                              // Set the 'active' state 0 or 1 as appropriate
            this.activeState = 0;
        }
        else {
            this.activeState = 1;
        }
        this.updateInterval = n.updateInterval*1000;    // How often to send totalActiveTime messages
        this.debounce = n.debounce || null;             // Enable switch contact debouncing algorithm
        if (n.outputOn === "rising") {
            this.activeEdges = [false, true];
        }
        else if (n.outputOn === "falling") {
            this.activeEdges = [true, false];
        }
        else if (n.outputOn === "both") {
            this.activeEdges = [true, true];
        }
        else {
            node.error("Invalid edge type: " + n.outputOn);
        }

        // Working variables
        this.interruptAttached = false; // Flag: should we detach interrupt when we are closed?
        this.intervalId = null;         // Remember the timer ID so we can delete it when we are closed
        this.currentState = 0;          // The pin input state "1" or "0"
        this.lastActiveTime = NaN;      // The date (in ms since epoch) when the pin last went high
        // switch to process.hrtime()
        this.totalActiveTime = 0;       // The total time in ms that the pin has been high (since reset)
        this.starting = true;
        this.debouncing = false;        // True after a change of state while waiting for the 7ms debounce time to elapse
        this.debounceTimer = null;

        // This function is called by the input pin change-of-state interrupt. If
        // debounce is disabled, send the output message. Otherwise, if we are
        // currently debouncing, ignore this interrupt. If we are not debouncing,
        // schedule a re-read of the input pin in 7ms time, and set the debouncing flag
        // Note: if x has an 'attached' field and no 'value' field, the callback is reporting
        // the success or failure of attaching the interrupt - we must handle this
        var interruptCallback = function (err, x) {
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
            else if (node.currentState !== Number(x)) {
                if (node.debounce) {
                    if (node.debouncing === false) {
                        node.debouncing = true;
                        node.debounceTimer = setTimeout(function () {
                            bonescript.digitalRead(node._pin, debounceCallback);
                        }, Number(node.debounce));
                    }
                }
                else {
                    sendStateMessage(x);
                }
            }
        };

        // This function is called approx 7ms after a potential change-of-state which is
        // being debounced. Terminate the debounce, and send a message if the state has
        // actually changed
        var debounceCallback = function (err, x) {
            node.debounceTimer = null;
            node.debouncing = false;
            if (x !== undefined && node.currentState !== Number(x)) {
                sendStateMessage(x);
            }
        };

        // This function is called when either the interruptCallback or the debounceCallback
        // have determined we have a 'genuine' change of state. Update the currentState and
        // ActiveTime variables, and send a message on the first output with the new state
        var sendStateMessage = function (x) {
            node.currentState = Number(x);
            var now = Date.now();
            if (node.currentState === node.activeState) {
                node.lastActiveTime = now;
            }
            else if (!isNaN(node.lastActiveTime)) {
                node.totalActiveTime += now - node.lastActiveTime;
            }
            if (node.activeEdges[node.currentState]) {
                var msg = {};
                msg.topic = node.topic;
                msg.payload = node.currentState;
                node.send([msg, null]);
            }
        };

        // This function is called by the timer. It updates the ActiveTime variables, and sends a
        // message on the second output with the latest value of the total active time, in seconds
        var timerCallback = function () {
            if (node.currentState === node.activeState) {
                var now = Date.now();
                node.totalActiveTime += now - node.lastActiveTime;
                node.lastActiveTime = now;
            }
            var msg = {};
            msg.topic = node.topic;
            msg.payload = node.totalActiveTime/1000;
            node.send([null, msg]);
            // Re-synchronise the pin state if we have missed a state change interrupt for some
            // reason, and we are not in the process of debouncing one
            if (node.debouncing === false) {
                bonescript.digitalRead(node._pin, interruptCallback);
            }
        };

        // This function is called when we receive an input message. If the topic contains
        // 'load' (case insensitive) set the totalActiveTime to the numeric value of the
        // payload, if possible. Otherwise clear the totalActiveTime (so we start counting
        // from zero again)
        var inputCallback = function (ipMsg) {
            if (String(ipMsg.topic).search(/load/i) < 0 || isFinite(ipMsg.payload) === false) {
                node.totalActiveTime = 0;
            }
            else {
                node.totalActiveTime = Number(ipMsg.payload);
            }
            if (node.currentState === node.activeState) {
                node.lastActiveTime = Date.now();
            }
            // On startup, send an initial activeTime message, but only send an
            // initial currentState message if we are in both edges active mode
            if (node.starting) {
                node.starting = false;
                var msg;
                if (node.activeEdges[0] && node.activeEdges[1]) {
                    msg = [{topic: node.topic}, {topic: node.topic}];
                    msg[0].payload = node.currentState;
                }
                else {
                    msg = [null, {topic: node.topic}];
                }
                msg[1].payload = node.totalActiveTime;
                node.send(msg);
            }
        };

        // If we have a valid pin, set it as an input and read the (digital) state
        if (gpioPins.indexOf(node.pin) >= 0) {
            // Don't set up interrupts & intervals until after the close event handler has been installed
            bonescript.detachInterrupt(node._pin);
            process.nextTick(function () {
                setPinMode(node._pin, bonescript.INPUT, function (response, pin) {
                    if (!response) {
                        bonescript.digitalRead(node._pin, function (err, x) {
                            // Initialise the currentState and lastActiveTime variables based on the value read
                            node.currentState = Number(x);
                            if (node.currentState === node.activeState) {
                                node.lastActiveTime = Date.now();
                            }
                            // Attempt to attach a change-of-state interrupt handler to the pin. If we succeed,
                            // the input event and interval handlers will be installed by interruptCallback
                            bonescript.attachInterrupt(node._pin, bonescript.CHANGE, interruptCallback);
                            // Send an initial message with the pin state on the first output
                            setTimeout(function () {
                                node.emit("input", {});
                            }, 50);
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