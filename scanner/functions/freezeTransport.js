function freezeTransport() {
                        if (failed) return; // Any callback called by transport should be ignored since now

                        failed = true;
                        cleanup();
                        transport.close();
                        transport = null;
                    }