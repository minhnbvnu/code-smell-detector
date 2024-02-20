function readOctetStream(s, octetStream, minValue) {
    var size = readLength(s) + (minValue || 0);
    if(size !== octetStream.length) {
        return false;
    }
    for(var i = 0; i < size; i++) {
        var c = new type.UInt8().read(s);
        if(octetStream.charCodeAt(i) !== c.value) {
            return false;
        }
    }
        
    return true;
}