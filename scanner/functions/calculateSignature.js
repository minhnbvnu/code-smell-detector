function calculateSignature(key, stringToSign) {
        return hexEncode(hmac(key, stringToSign));
    }