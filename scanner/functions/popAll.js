function popAll() {
                        const endTime = 1e3 * timestamp();
                        for (let i = eventStack.length - 1; i >= 0; i--) {
                            writeStackEvent(i, endTime);
                        }
                        eventStack.length = 0;
                    }