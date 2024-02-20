function last_key(s) {
    if (! Array.isArray(s) || typeof s === 'string') {
        $error('Argument to last_key() must be a string or array');
    }
    return size(s) - 1;
}