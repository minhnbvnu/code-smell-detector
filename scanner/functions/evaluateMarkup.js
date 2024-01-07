function evaluateMarkup(symbols) {
    // log scanner output
    // console.info((new Scanner(symbols)).debugPrint());

    const parser = new Parser(symbols);
    const stripped_symbols = [];
    const tags = [];

    if (!parser.parse(stripped_symbols, tags)) {
        console.warn(parser.error());
        return {
            symbols: symbols,
            tags: null
        };
    }

    // if any tags were not correctly closed, return failure
    const invalidTag = tags.find(function (t) {
        return t.end === null;
    });

    if (invalidTag) {
        console.warn(`Markup error: found unclosed tag='${invalidTag.name}'`);
        return {
            symbols: symbols,
            tags: null
        };
    }

    // revolve tags per-character
    const resolved_tags = resolveMarkupTags(tags, stripped_symbols.length);

    return {
        symbols: stripped_symbols,
        tags: resolved_tags
    };
}