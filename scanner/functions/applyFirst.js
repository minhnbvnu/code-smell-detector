function applyFirst(method, args) {
            args = argsToArray(arguments, 1);
            if (!isString(method) && !isFunction(method)) {
                throw new Error(method + " must be the name of a property or function to execute");
            }
            if (isString(method)) {
                return function () {
                    var scopeArgs = argsToArray(arguments), scope = scopeArgs.shift();
                    var func = scope[method];
                    if (isFunction(func)) {
                        scopeArgs = args.concat(scopeArgs);
                        return spreadArgs(func, scopeArgs, scope);
                    } else {
                        return func;
                    }
                };
            } else {
                return function () {
                    var scopeArgs = argsToArray(arguments), scope = scopeArgs.shift();
                    scopeArgs = args.concat(scopeArgs);
                    return spreadArgs(method, scopeArgs, scope);
                };
            }
        }