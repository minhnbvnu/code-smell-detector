function observeState() {
                                        if (observer.next) {
                                            observer.next(getState());
                                        }
                                    }