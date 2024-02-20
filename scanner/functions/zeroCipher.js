function zeroCipher(key, message) {
    return sjcl.encrypt(key,compress(message));
}