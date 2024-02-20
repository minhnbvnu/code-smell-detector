function pendingCancel() {
                        var index = find(rafCallbacks, pendingCancel);
                        rafCallbacks[index] = rafCallbacks[rafCallbacks.length - 1];
                        rafCallbacks.length -= 1;
                        if (rafCallbacks.length <= 0) {
                            stopRAF();
                        }
                    }