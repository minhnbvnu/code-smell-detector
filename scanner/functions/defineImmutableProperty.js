function defineImmutableProperty(object, key, value) {
    const i = key.indexOf('.');

    if (i === -1) {
        // Base case.
        // Set `configurable` to true so that we can later redefine
        Object.defineProperty(object, key, {configurable: true, enumerable: true, writable: false, value: value});
    } else {
        const rest = key.substring(i + 1);
        let first = key.substring(0, i);
        {
            const n = parseInt(first);
            if (! isNaN(n)) { first = n; }
        }
        let parent = object[first];
        
        if (parent === undefined) {
            if (typeof first === 'string') {
                // Object
                parent = {};
            } else {
                // Array
                parent = [];
            }
            // Define parent object
            defineImmutableProperty(object, first, parent);
        }

        // Recurse to approach the actual leaf object
        defineImmutableProperty(parent, rest, value);
    }
}