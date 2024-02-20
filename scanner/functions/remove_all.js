function remove_all(t) {
    if ($iteratorCount.get(t)) {
        $error('Cannot remove_all() while using a container in a for loop. Call clone() on the container in the for loop declaration.');
    }
    if (Array.isArray(t)) {
        t.length = 0;
    } else {
        for (var key in t){
            if (t.hasOwnProperty(key)){
                delete t[key];
            }
        }
    }
}