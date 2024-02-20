function toReferenceEntry(entry) {
            const documentSpan = entryToDocumentSpan(entry);
            if (entry.kind === 0 /* Span */) {
                return { ...documentSpan, isWriteAccess: false };
            }
            const { kind, node } = entry;
            return {
                ...documentSpan,
                isWriteAccess: isWriteAccessForReference(node),
                isInString: kind === 2 /* StringLiteral */ ? true : void 0
            };
        }