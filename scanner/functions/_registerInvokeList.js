function _registerInvokeList(args, moduleName) {
            var invokeList = args[2][0],
                type = args[1],
                newInvoke = false;
            if (angular.isUndefined(regInvokes[moduleName])) {
                regInvokes[moduleName] = {};
            }
            if (angular.isUndefined(regInvokes[moduleName][type])) {
                regInvokes[moduleName][type] = {};
            }
            var onInvoke = function onInvoke(invokeName, signature) {
                if (angular.isUndefined(regInvokes[moduleName][type][invokeName])) {
                    regInvokes[moduleName][type][invokeName] = [];
                }
                if (regInvokes[moduleName][type][invokeName].indexOf(signature) === -1) {
                    newInvoke = true;
                    regInvokes[moduleName][type][invokeName].push(signature);
                    broadcast("ocLazyLoad.componentLoaded", [moduleName, type, invokeName]);
                }
            };

            function signature(data) {
                if (angular.isArray(data)) {
                    // arrays are objects, we need to test for it first
                    return hashCode(data.toString());
                } else if (angular.isObject(data)) {
                    // constants & values for example
                    return hashCode(stringify(data));
                } else {
                    if (angular.isDefined(data) && data !== null) {
                        return hashCode(data.toString());
                    } else {
                        // null & undefined constants
                        return data;
                    }
                }
            }

            if (angular.isString(invokeList)) {
                onInvoke(invokeList, signature(args[2][1]));
            } else if (angular.isObject(invokeList)) {
                angular.forEach(invokeList, function (invoke, key) {
                    if (angular.isString(invoke)) {
                        // decorators for example
                        onInvoke(invoke, signature(invokeList[1]));
                    } else {
                        // components registered as object lists {"componentName": function() {}}
                        onInvoke(key, signature(invoke));
                    }
                });
            } else {
                return false;
            }
            return newInvoke;
        }