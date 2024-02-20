function find_if(func, array) {
    for (var i = array.length; --i >= 0;) if (func(array[i])) return array[i];
}