function sorted(array, k, reverse) {
    array = clone(array);
    sort(array, k, reverse);
    return array;
}