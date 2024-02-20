function formatNodeGivenIndentation(node, sourceFileLike, languageVariant, initialIndentation, delta, formatContext) {
            const range = { pos: node.pos, end: node.end };
            return getFormattingScanner(sourceFileLike.text, languageVariant, range.pos, range.end, (scanner2) => formatSpanWorker(range, node, initialIndentation, delta, scanner2, formatContext, 1 /* FormatSelection */, (_) => false, 
            // assume that node does not have any errors
            sourceFileLike));
        }