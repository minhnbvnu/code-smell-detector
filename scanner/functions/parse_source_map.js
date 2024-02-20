function parse_source_map(content) {
    try {
        return JSON.parse(content);
    } catch (ex) {
        throw new Error("invalid input source map: " + content);
    }
}