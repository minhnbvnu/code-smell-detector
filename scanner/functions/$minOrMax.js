function $minOrMax(a, b) {
    const ta = typeof a, tb = typeof b;
    let allNumbers = (ta === 'number') && (tb === 'number');
    const fcn = this;

    if (allNumbers || (arguments.length > 2)) {
        // common case on only numbers
        return fcn.apply($Math, arguments);
    } else {
        if (ta === 'Number') {
            // Swap, b is the vector
            let tmp = b; b = a; a = b;
            tmp = tb; tb = ta; ta = tmp;
        }

        let c = a.constructor ? a.constructor() : $Object.create(null);
        if (tb === 'Number') for (let key in a) c[key] = fcn(a[key], b);
        else                 for (let key in a) c[key] = fcn(a[key], b[key]);
        return $Object.isFrozen(a) ? $Object.freeze(c) : c;
    }
}