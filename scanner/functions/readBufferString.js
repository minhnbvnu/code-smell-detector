function readBufferString(byteString, chatset) {
    var byteArray = byteString.toByteArray();
    var str = JavaStringWapper.$new(byteArray, chatset)
    return str;
}