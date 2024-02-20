function fast_remove_key(t, i) {
    if ($iteratorCount.get(t)) {
        $error('Cannot fast_remove_key() while using a container in a for loop. Call clone() on the container in the for loop declaration.');
    }
    if (Array.isArray(t)) {
        if (typeof i !== 'number') { throw 'fast_remove_key(array, i) called with a key (' + i + ') that is not a number'; }
        let L = t.length;
        t[i] = t[L - 1];
        t.length = L - 1;
    } else if (typeof t === 'object') {
        delete t[key];
    }
}