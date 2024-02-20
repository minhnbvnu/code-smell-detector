function frozenDeepClone(src, alreadySeen) {
    if (src === null || src === undefined) {
        return undefined;
    } else if (alreadySeen.has(src)) {
        return alreadySeen.get(src);
    } else if (Array.isArray(src)) {
        const v = [];
        alreadySeen.set(src, v);
        for (let i = 0; i < src.length; ++i) {
            v[i] = frozenDeepClone(src[i], alreadySeen);
        }
        return Object.freeze(v);
    } else switch (typeof src) {
        case 'string':
        case 'number':
        case 'undefined':
        case 'boolean':
        return src;

        case 'object': {
            let clone = Object.create(null);
            alreadySeen.set(src, clone);
            for (let key in src) {
                if (key === '$name') { clone.$name = src.$name; continue; }
                if (key[0] === '$') {
                    throw 'Illegal constant field name: "' + key + '"';
                }
                clone[key] = frozenDeepClone(src[key], alreadySeen);
            }
            return Object.freeze(clone);
        }

        default: throw 'Cannot clone an object of type ' + (typeof src);
    } // switch
}