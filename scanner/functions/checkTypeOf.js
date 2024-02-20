function checkTypeOf(value, type, message) {
            if (!standardTypeEh(value, type)) {
                raise('invalid parameter type' + encolon(message) +
                    '. expected ' + type + ', got ' + (typeof value));
            }
        }