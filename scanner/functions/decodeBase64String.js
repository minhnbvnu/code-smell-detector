function decodeBase64String(b64) {
        if (typeof TextDecoder === "undefined" || typeof Uint8Array === "undefined") {
            return atob(b64);
        }
        var buf = base64ToBuf(b64);
        // Note: `decoder.decode` method will throw a `DOMException` with the
        // `"EncodingError"` value when an coding error is found.
        var decoder = new TextDecoder(jsonCharacterEncoding, { fatal: true });
        return decoder.decode(buf);
    }