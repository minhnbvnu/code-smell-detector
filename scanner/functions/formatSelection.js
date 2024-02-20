function formatSelection(start, end, sourceFile, formatContext) {
            const span = {
                pos: getLineStartPositionForPosition(start, sourceFile),
                end
            };
            return formatSpan(span, sourceFile, formatContext, 1 /* FormatSelection */);
        }