function _activateServiceEvent(eventName) {
                var i;
                if (angular.isArray(serviceListeners[eventName])) {
                    for (i = 0; i < serviceListeners[eventName].length; i++) {
                        serviceListeners[eventName][i]();
                    }
                }
            }