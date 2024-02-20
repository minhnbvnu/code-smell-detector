function dimen2em(dim) {
            var _a = __read(matchDimen(dim), 2), value = _a[0], unit = _a[1];
            var m = parseFloat(value || '1');
            var func = UNIT_CASES[unit];
            return func ? func(m) : 0;
        }