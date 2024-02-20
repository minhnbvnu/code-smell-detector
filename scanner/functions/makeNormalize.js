function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }