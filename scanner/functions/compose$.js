function compose$() {
        var functions = arguments;
        return function () {
            var i, result;
            result = functions[0].apply(this, arguments);
            for (i = 1; i < functions.length; ++i) {
                result = functions[i](result);
            }
            return result;
        };
    }