function hexToUtf8(hex) {
    try {
        return decodeURIComponent('%' + hex.match(/.{1,2}/g).join('%'));
    } catch (error) {
        return "hex[" + hex + "]";
    }
}