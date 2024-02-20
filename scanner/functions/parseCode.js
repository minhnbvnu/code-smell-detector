function parseCode(code, lang, parseMarkdown, options) {
    const parser = parsers[lang];
    if (!parser) {
        return [new raw_1.Raw(code)];
    }
    return [...parser(code, parseMarkdown, options)];
}