function push_front(array, ...args) {
    if (! Array.isArray(array)) { $error('push_front() requires an array argument'); }
    if ($iteratorCount.get(array)) {
        $error('Cannot push_front() while using a container in a for loop. Call clone() on the container in the for loop declaration.');
    }
    array.unshift(...args);
    return array[0];
}