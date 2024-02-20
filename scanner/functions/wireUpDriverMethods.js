function wireUpDriverMethods(driver) {
        var LibraryMethods = ['clear', 'getItem', 'iterate', 'key', 'keys', 'length', 'removeItem', 'setItem'];

        function wireUpDriverMethod(driver, methodName) {
            driver[methodName] = function () {
                var localForageInstance = this;
                var args = arguments;
                return getWebSqlDriverPromise(localForageInstance).then(function (webSqlDriver) {
                    return webSqlDriver[methodName].apply(localForageInstance, args);
                });
            };
        }

        for (var i = 0, len = LibraryMethods.length; i < len; i++) {
            wireUpDriverMethod(driver, LibraryMethods[i]);
        }
    }