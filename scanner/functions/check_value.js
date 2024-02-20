function check_value(expected, key) {
            var value = get_option(key), type = typeof value;
            if (type != 'undefined' && type != expected)
                throw new TypeError(type + ' received for ' + key + ', but expected a ' + expected);
            return (type == expected) ? value : defaults[key];
        }