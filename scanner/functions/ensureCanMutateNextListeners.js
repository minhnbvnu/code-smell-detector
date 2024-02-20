function ensureCanMutateNextListeners() {
                            if (nextListeners === currentListeners) {
                                nextListeners = currentListeners.slice();
                            }
                        }