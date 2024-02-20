function hitchIgnore(scope, method, args) {
            args = argsToArray(arguments, 2);
            if ((isString(method) && !(method in scope))) {
                throw new Error(method + " property not defined in scope");
            } else if (!isString(method) && !isFunction(method)) {
                throw new Error(method + " is not a function");
            }
            if (isString(method)) {
                return function () {
                    var func = scope[method];
                    if (isFunction(func)) {
                        return spreadArgs(func, args, scope);
                    } else {
                        return func;
                    }
                };
            } else {
                return function () {
                    return spreadArgs(method, args, scope);
                };
            }
        }