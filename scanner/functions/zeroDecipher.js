function zeroDecipher(key, data) {
    return decompress(sjcl.decrypt(key,data));
}