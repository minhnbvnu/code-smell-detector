function proxy(e) {
                    listener(e);
                    dom.off(eventName, targetSelector, proxy, capture);
                }