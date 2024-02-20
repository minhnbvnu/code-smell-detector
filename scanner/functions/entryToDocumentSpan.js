function entryToDocumentSpan(entry) {
            if (entry.kind === 0 /* Span */) {
                return { textSpan: entry.textSpan, fileName: entry.fileName };
            }
            else {
                const sourceFile = entry.node.getSourceFile();
                const textSpan = getTextSpan(entry.node, sourceFile);
                return {
                    textSpan,
                    fileName: sourceFile.fileName,
                    ...toContextSpan(textSpan, sourceFile, entry.context)
                };
            }
        }