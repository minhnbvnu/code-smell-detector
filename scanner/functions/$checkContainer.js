function $checkContainer(container) {
    if (! Array.isArray(container) && (typeof container !== 'string') && (typeof container !== 'object')) {
        $error('The container used with a for...in loop must be an object, string, or array. (was ' + unparse(container) + ')');
    }
}