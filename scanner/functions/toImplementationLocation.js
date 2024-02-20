function toImplementationLocation(entry, checker) {
            const documentSpan = entryToDocumentSpan(entry);
            if (entry.kind !== 0 /* Span */) {
                const { node } = entry;
                return {
                    ...documentSpan,
                    ...implementationKindDisplayParts(node, checker)
                };
            }
            else {
                return { ...documentSpan, kind: "" /* unknown */, displayParts: [] };
            }
        }