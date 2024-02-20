function is_object(a) {
    return ! is_array(a) && (typeof a === 'object');
}