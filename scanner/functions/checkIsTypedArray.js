function checkIsTypedArray(data, message) {
            if (!isTypedArray(data)) {
                raise('invalid parameter type' + encolon(message) +
                    '. must be a typed array');
            }
        }