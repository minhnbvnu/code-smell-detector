function assertPatternsInput(input) {
        const source = [].concat(input);
        const isValidSource = source.every((item) => utils.string.isString(item) && !utils.string.isEmpty(item));
        if (!isValidSource) {
            throw new TypeError('Patterns must be a string (non empty) or an array of strings');
        }
    }