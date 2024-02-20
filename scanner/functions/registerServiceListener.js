function registerServiceListener(eventName, listenerFn, listenerObject) {
                return _registerListener(serviceListeners, eventName, listenerFn, listenerObject);
            }