function loadSync(url) {
    var fs = _dereq_('fs');
    var buffer = fs.readFileSync(url);
    return parseBuffer(toArrayBuffer(buffer));
}