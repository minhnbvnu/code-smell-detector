function padMarkdown(input, options) {
    const opts = (0, pad_markdown_options_1.normalize)(options);
    const doc = (0, parse_1.parse)(input, opts);
    (0, pad_recursively_1.padRecursively)(doc);
    return doc.toMarkdown();
}