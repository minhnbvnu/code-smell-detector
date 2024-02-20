function NewBuffer(byteString) {
    var buffer = OkioBufferWapper.$new()
    byteString.write(buffer)
    return buffer;
}