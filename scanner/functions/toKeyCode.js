function toKeyCode(s) {
    if (typeof s === 'string') {
        return s.toUpperCase().charCodeAt(0);
    }
    return s;
}