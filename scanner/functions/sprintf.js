function sprintf(key) {
            // `arguments` is not an array, but should be fine for this call
            return sprintf_format(sprintf_parse(key), arguments);
        }