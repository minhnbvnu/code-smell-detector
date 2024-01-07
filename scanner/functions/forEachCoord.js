function forEachCoord(arr, fn, context) {
    if (!Array.isArray(arr)) {
        return context ? fn.call(context, arr) : fn(arr);
    }
    const result = [];
    let p, pp;
    for (let i = 0, len = arr.length; i < len; i++) {
        p = arr[i];
        if (isNil(p)) {
            result.push(null);
            continue;
        }
        if (Array.isArray(p)) {
            result.push(forEachCoord(p, fn, context));
        } else {
            pp = context ? fn.call(context, p) : fn(p);
            result.push(pp);
        }

    }
    return result;
}