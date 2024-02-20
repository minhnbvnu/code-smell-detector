function parseFromTokenizer(tokenizer, mimeType, options = {}) {
    if (!tokenizer.fileSize && options.fileSize) {
        tokenizer.fileSize = options.fileSize;
    }
    return ParserFactory_1.ParserFactory.parse(tokenizer, mimeType, options);
}