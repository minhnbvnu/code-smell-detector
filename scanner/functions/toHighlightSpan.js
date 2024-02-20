function toHighlightSpan(entry) {
            const documentSpan = entryToDocumentSpan(entry);
            if (entry.kind === 0 /* Span */) {
                return {
                    fileName: documentSpan.fileName,
                    span: {
                        textSpan: documentSpan.textSpan,
                        kind: "reference" /* reference */
                    }
                };
            }
            const writeAccess = isWriteAccessForReference(entry.node);
            const span = {
                textSpan: documentSpan.textSpan,
                kind: writeAccess ? "writtenReference" /* writtenReference */ : "reference" /* reference */,
                isInString: entry.kind === 2 /* StringLiteral */ ? true : void 0,
                ...documentSpan.contextSpan && { contextSpan: documentSpan.contextSpan }
            };
            return { fileName: documentSpan.fileName, span };
        }