function pop_front(array) {
    if (! Array.isArray(array)) { $error('pop_front() requires an array argument'); }
    if ($iteratorCount.get(array)) {
        $error('Cannot pop_front() while using a container in a for loop. Call clone() on the container in the for loop declaration.');
    }
    if (array.length === 0) { return undefined;  }
    return array.shift();
}