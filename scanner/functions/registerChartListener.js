function registerChartListener(eventName, listenerFn, listenerObject) {
                return _registerListener(chartListeners, eventName, listenerFn, listenerObject);
            }