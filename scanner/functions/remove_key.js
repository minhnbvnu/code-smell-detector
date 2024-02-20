function remove_key(t, i) {
    if ($iteratorCount.get(t)) {
        $error('Cannot remove_key() while using a container in a for loop. Call clone() on the container in the for loop declaration.');
    }

    if (arguments.length !== 2) {
        $error('remove_key() requires exactly two arguments');
    }
    
    if (Array.isArray(t)) {
        if (typeof i !== 'number') { throw 'remove_key(array, i) called with a key (' + i + ') that is not a number'; }
        t.splice(i, 1);
    } else if (typeof t === 'object') {
        delete t[i];
    } else {
        $error('remove_key() requires a container as the first argument');
    }
}