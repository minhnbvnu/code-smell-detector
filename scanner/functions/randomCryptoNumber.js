function randomCryptoNumber() {
    var buf = new Uint8Array(1);
    window.crypto.getRandomValues(buf);
    var randomNumber = buf[0] / 255;
    return randomNumber;
}