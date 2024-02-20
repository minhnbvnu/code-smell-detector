function steamroller(arr) {
    let flattened = [].concat(...arr);
    return flattened.some(item => Array.isArray(item)) ? steamroller(flattened) : flattened;
}