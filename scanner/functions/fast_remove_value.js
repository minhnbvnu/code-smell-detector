function fast_remove_value(t, value) {
    if ($iteratorCount.get(t)) {
        $error('Cannot fast_remove_value() while using a container in a for loop. Call clone() on the container in the for loop declaration.');
    }
    if (Array.isArray(t)) {
        for (let i = 0; i < t.length; ++i) {
            if (t[i] === value) {
                t[i] = t[t.length - 1];                
                t.pop();
                return;
            }
        }
    } else if (typeof t === 'object') {
        for (let k in t) {
            if (t[k] === value) {
                delete t[k];
                return;
            }
        }
    }
}