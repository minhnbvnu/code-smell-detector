function hasStrictCamelHumps(name, isUpper) {
        function isUppercaseChar(char) {
            return char === char.toUpperCase() && char !== char.toLowerCase();
        }
        if (name.startsWith('_')) {
            return false;
        }
        for (let i = 1; i < name.length; ++i) {
            if (name[i] === '_') {
                return false;
            }
            if (isUpper === isUppercaseChar(name[i])) {
                if (isUpper) {
                    return false;
                }
            }
            else {
                isUpper = !isUpper;
            }
        }
        return true;
    }