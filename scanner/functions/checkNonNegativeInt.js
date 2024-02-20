function checkNonNegativeInt(value, message) {
            if (!((value >= 0) &&
                ((value | 0) === value))) {
                raise('invalid parameter type, (' + value + ')' + encolon(message) +
                    '. must be a nonnegative integer');
            }
        }