function $div(a, b) {
    return ((typeof a === 'object') && (a !== null)) ? $objectDiv(a, b) : a / b;
}