function curryFunc(f, execute) {
            return function () {
                var args = argsToArray(arguments);
                return execute ? spreadArgs(f, arguments, this) : function () {
                    return spreadArgs(f, args.concat(argsToArray(arguments)), this);
                };
            };
        }