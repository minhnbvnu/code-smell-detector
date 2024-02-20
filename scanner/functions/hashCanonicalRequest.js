function hashCanonicalRequest(request) {
        return hexEncode(hash(request));
    }