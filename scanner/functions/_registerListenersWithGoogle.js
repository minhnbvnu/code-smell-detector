function _registerListenersWithGoogle(eventSource, listenerCollection) {
                for (var eventName in listenerCollection) {
                    if (listenerCollection.hasOwnProperty(eventName) && angular.isArray(listenerCollection[eventName])) {
                        for (var fnIterator = 0; fnIterator < listenerCollection[eventName].length; fnIterator++) {
                            if (angular.isFunction(listenerCollection[eventName][fnIterator])) {
                                listenerCollection[eventName][fnIterator].googleListenerHandle =
                                    $google.visualization.events.addListener(eventSource, eventName, listenerCollection[eventName][fnIterator]);
                            }
                        }
                    }
                }
            }