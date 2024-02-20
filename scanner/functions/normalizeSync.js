function normalizeSync(items, context, extraConfigTypes) {
        const allowFunctions = extraConfigTypes.includes('function');
        const allowArrays = extraConfigTypes.includes('array');
        function* flatTraverse(array) {
            for (let item of array) {
                if (typeof item === 'function') {
                    if (!allowFunctions) {
                        throw new TypeError('Unexpected function.');
                    }
                    item = item(context);
                    if (item.then) {
                        throw new TypeError('Async config functions are not supported.');
                    }
                }
                if (Array.isArray(item)) {
                    if (!allowArrays) {
                        throw new TypeError('Unexpected array.');
                    }
                    yield* flatTraverse(item);
                }
                else if (typeof item === 'function') {
                    throw new TypeError('A config function can only return an object or array.');
                }
                else {
                    yield item;
                }
            }
        }
        return [...flatTraverse(items)];
    }