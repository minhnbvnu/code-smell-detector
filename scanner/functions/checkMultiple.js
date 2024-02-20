function checkMultiple(input, types, options) {
            if (toString$.call(types).slice(8, -1) !== 'Array') {
                throw new Error("Types must be in an array. Input: " + input + ".");
            }
            return any(function (it) {
                return check(input, it, options);
            }, types);
        }