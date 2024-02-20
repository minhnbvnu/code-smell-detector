function parseStream(stream, mimeType, options = {}) {
    return parseFromTokenizer(strtok3.fromStream(stream), mimeType, options);
}