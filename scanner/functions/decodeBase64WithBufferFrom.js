function decodeBase64WithBufferFrom(base64) {
        return Buffer.from(base64, 'base64').toString();
    }