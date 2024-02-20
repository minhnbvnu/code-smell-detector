function _registerListener(listenerCollection, eventName, listenerFn, listenerObject) {
                // This is the function that will be invoked by the charts API.
                // Passing the wrapper function allows the use of DI for
                // for the called function.
                var listenerWrapper = function() {
                    var locals = {
                        chartWrapper: _chartWrapper,
                        chart: _chartWrapper.getChart(),
                        args: arguments
                    };
                    $injector.invoke(listenerFn, listenerObject || this, locals);
                };

                if (angular.isDefined(listenerCollection) && angular.isObject(listenerCollection)) {
                    if (!angular.isArray(listenerCollection[eventName])) {
                        listenerCollection[eventName] = [];
                    }
                    listenerCollection[eventName].push(listenerWrapper);
                    return function() {
                        if (angular.isDefined(listenerWrapper.googleListenerHandle)) {
                            $google.visualization.events.removeListener(listenerWrapper.googleListenerHandle);
                        }
                        var fnIndex = listenerCollection[eventName].indexOf(listenerWrapper);
                        listenerCollection[eventName].splice(fnIndex, 1);
                        if (listenerCollection[eventName].length === 0) {
                            listenerCollection[eventName] = undefined;
                        }
                    };
                }
            }