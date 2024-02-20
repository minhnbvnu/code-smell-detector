function createCStyleParser(inlineCommentPrefix, delimitedComment, traps) {
    return function* cpp(code, parseMarkdown, options) {
        let i = 0;
        let prevI = 0;
        const N = code.length;
        while (i < N) {
            // match inline comment first, example:
            // int foo = 1; // this is foo
            if ((0, string_1.matchSubstring)(code, i, inlineCommentPrefix)) {
                const j = code.indexOf('\n', i);
                const end = j === -1 ? N : j;
                if (i + inlineCommentPrefix.length > prevI) {
                    yield new raw_1.Raw(code.slice(prevI, i + inlineCommentPrefix.length));
                }
                yield parseMarkdown(code.slice(i + inlineCommentPrefix.length, end), options);
                prevI = i = end;
                continue;
            }
            // match block comment, example:
            // int foo = 1; /* this is foo */
            const [prefix, suffix] = delimitedComment;
            if ((0, string_1.matchSubstring)(code, i, prefix)) {
                const j = code.indexOf(suffix, i + prefix.length);
                const end = j === -1 ? N : j;
                if (i + prefix.length > prevI) {
                    yield new raw_1.Raw(code.slice(prevI, i + prefix.length));
                }
                yield parseMarkdown(code.slice(i + prefix.length, end), options);
                prevI = i = end;
                continue;
            }
            // ignore traps, example:
            // string href = "http://example.com"
            for (const [prefix, suffix] of traps) {
                if (!(0, string_1.matchSubstring)(code, i, prefix))
                    continue;
                const j = code.indexOf(suffix, i + prefix.length);
                const end = j === -1 ? N : j;
                i = end;
                continue;
            }
            i++;
        }
        if (prevI < N) {
            yield new raw_1.Raw(code.slice(prevI, N));
        }
    };
}