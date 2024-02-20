function isOneOf(a, b, c, d, e) {
        return function (value) {
            return a(value) || b(value) || (!!c && c(value)) || (!!d && d(value)) || (!!e && e(value));
        };
    }