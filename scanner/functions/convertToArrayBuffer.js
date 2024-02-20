function convertToArrayBuffer(body, encoding) {
    if (body instanceof ArrayBuffer) {
        return body;
    }

    return new GlobalTextEncoder(encoding || "utf-8").encode(body).buffer;
}