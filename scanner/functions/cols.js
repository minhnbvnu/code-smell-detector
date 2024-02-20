function cols() {
            var W = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                W[_i] = arguments[_i];
            }
            return W.map(function (n) { return Em(n); }).join(' ');
        }