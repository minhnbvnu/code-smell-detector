function walkInternal(obj, iterator, context, originalObj, seen) {
    var proto, prop;

    if (typeof Object.getOwnPropertyNames !== "function") {
        // We explicitly want to enumerate through all of the prototype's properties
        // in this case, therefore we deliberately leave out an own property check.
        /* eslint-disable-next-line guard-for-in */
        for (prop in obj) {
            iterator.call(context, obj[prop], prop, obj);
        }

        return;
    }

    forEach(Object.getOwnPropertyNames(obj), function(k) {
        if (seen[k] !== true) {
            seen[k] = true;
            var target = typeof Object.getOwnPropertyDescriptor(obj, k).get === "function" ? originalObj : obj;
            iterator.call(context, k, target);
        }
    });

    proto = Object.getPrototypeOf(obj);
    if (proto) {
        walkInternal(proto, iterator, context, originalObj, seen);
    }
}