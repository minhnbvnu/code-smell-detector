function toReferencedSymbolEntry(entry, symbol) {
            const referenceEntry = toReferenceEntry(entry);
            if (!symbol)
                return referenceEntry;
            return {
                ...referenceEntry,
                isDefinition: entry.kind !== 0 /* Span */ && isDeclarationOfSymbol(entry.node, symbol)
            };
        }