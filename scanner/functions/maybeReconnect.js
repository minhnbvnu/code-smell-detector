function maybeReconnect() {
                if (!self.reconnecting) {
                    return;
                }

                if (self.connected) {
                    return reset();
                };

                if (self.connecting && self.reconnecting) {
                    return self.reconnectionTimer = setTimeout(maybeReconnect, 1000);
                }

                if (self.reconnectionAttempts++ >= maxAttempts) {
                    if (!self.redoTransports) {
                        self.on('connect_failed', maybeReconnect);
                        self.options['try multiple transports'] = true;
                        self.transports = self.origTransports;
                        self.transport = self.getTransport();
                        self.redoTransports = true;
                        self.connect();
                    } else {
                        self.publish('reconnect_failed');
                        reset();
                    }
                } else {
                    if (self.reconnectionDelay < limit) {
                        self.reconnectionDelay *= 2; // exponential back off
                    }

                    self.connect();
                    self.publish('reconnecting', self.reconnectionDelay, self.reconnectionAttempts);
                    self.reconnectionTimer = setTimeout(maybeReconnect, self.reconnectionDelay);
                }
            }