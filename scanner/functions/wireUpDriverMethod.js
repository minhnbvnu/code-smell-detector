function wireUpDriverMethod(driver, methodName) {
            driver[methodName] = function () {
                var localForageInstance = this;
                var args = arguments;
                return getWebSqlDriverPromise(localForageInstance).then(function (webSqlDriver) {
                    return webSqlDriver[methodName].apply(localForageInstance, args);
                });
            };
        }