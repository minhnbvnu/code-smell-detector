function formatSpan(originalRange, sourceFile, formatContext, requestKind) {
            const enclosingNode = findEnclosingNode(originalRange, sourceFile);
            return getFormattingScanner(sourceFile.text, sourceFile.languageVariant, getScanStartPosition(enclosingNode, originalRange, sourceFile), originalRange.end, (scanner2) => formatSpanWorker(originalRange, enclosingNode, SmartIndenter.getIndentationForNode(enclosingNode, originalRange, sourceFile, formatContext.options), getOwnOrInheritedDelta(enclosingNode, formatContext.options, sourceFile), scanner2, formatContext, requestKind, prepareRangeContainsErrorFunction(sourceFile.parseDiagnostics, originalRange), sourceFile));
        }