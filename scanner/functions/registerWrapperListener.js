function registerWrapperListener(eventName, listenerFn, listenerObject) {
                return _registerListener(wrapperListeners, eventName, listenerFn, listenerObject);
            }