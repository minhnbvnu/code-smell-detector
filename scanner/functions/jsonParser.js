function jsonParser(source, url) {
    fileContents[url] = source;
    return WorkJSON.parse(source);
}