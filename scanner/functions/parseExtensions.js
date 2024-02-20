function parseExtensions(input) {
            if (typeof input === 'string') {
                return input.split();
            }
            check$1(Array.isArray(input), 'invalid extension array');
            return input;
        }