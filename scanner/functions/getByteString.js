function getByteString(buffer) {
    var bytearray = buffer[M_buffer_readByteArray]();
    var byteString = OkioByteStrngWapper.of(bytearray)
    return byteString;
}