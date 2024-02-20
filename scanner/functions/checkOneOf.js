function checkOneOf(value, list, message) {
            if (list.indexOf(value) < 0) {
                raise('invalid value' + encolon(message) + '. must be one of: ' + list);
            }
        }