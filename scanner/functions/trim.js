function trim(str) {
    return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}