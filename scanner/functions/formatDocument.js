function formatDocument(sourceFile, formatContext) {
            const span = {
                pos: 0,
                end: sourceFile.text.length
            };
            return formatSpan(span, sourceFile, formatContext, 0 /* FormatDocument */);
        }