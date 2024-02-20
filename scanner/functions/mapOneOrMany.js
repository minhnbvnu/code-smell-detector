function mapOneOrMany(valueOrArray, f, resultSelector = identity) {
            return valueOrArray ? isArray(valueOrArray) ? resultSelector(map(valueOrArray, f)) : f(valueOrArray, 0) : void 0;
        }