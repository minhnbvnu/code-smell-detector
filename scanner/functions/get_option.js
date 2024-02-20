function get_option(key, fallback) {
            // if original is in options, return that value
            if (typeof options[key] != 'undefined')
                return options[key];
            // otherwise, return value from alias or fallback/undefined
            return typeof options[aliased.inverted[key]] != 'undefined'
                ? options[aliased.inverted[key]] : fallback;
        }