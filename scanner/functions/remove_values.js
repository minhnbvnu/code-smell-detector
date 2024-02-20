function remove_values(t, value) {
    let any = false;
    
    if ($iteratorCount.get(t)) {
        $error('Cannot remove_values() while using a container in a for loop. Call clone() on the container in the for loop declaration.');
    }
    
    if (Array.isArray(t)) {
        // Place to copy the next element to
        let dst = 0;
        for (let src = 0; src < t.length; ++src) {
            if (src > dst) { t[dst] = t[src]; }
            if (t[src] !== value) { ++dst; }
        }
        if (dst !== t.length) {
            t.length = dst;
            any = true;
        }
    } else if (typeof t === 'object') {
        for (let k in t) {
            if (t[k] === value) {
                delete t[k];
                any = true;
            }
        }
    }

    return any;
}