function muReplace(_a) {
            var _b = __read(_a, 3), value = _b[0], unit = _b[1], length = _b[2];
            if (unit !== 'mu') {
                return [value, unit, length];
            }
            var em = Em(UNIT_CASES[unit](parseFloat(value || '1')));
            return [em.slice(0, -2), 'em', length];
        }