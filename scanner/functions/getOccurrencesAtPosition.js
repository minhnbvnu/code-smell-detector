function getOccurrencesAtPosition(fileName, position) {
                return flatMap(getDocumentHighlights(fileName, position, [fileName]), (entry) => entry.highlightSpans.map((highlightSpan) => ({
                    fileName: entry.fileName,
                    textSpan: highlightSpan.textSpan,
                    isWriteAccess: highlightSpan.kind === "writtenReference" /* writtenReference */,
                    ...highlightSpan.isInString && { isInString: true },
                    ...highlightSpan.contextSpan && { contextSpan: highlightSpan.contextSpan }
                })));
            }