function onupgrade(to) {
                        if (transport && to.name !== transport.name) {
                            freezeTransport();
                        }
                    }