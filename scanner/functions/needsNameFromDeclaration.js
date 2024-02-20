function needsNameFromDeclaration(symbol) {
            return !(symbol.flags & 33554432 /* Transient */) && (symbol.escapedName === "export=" /* ExportEquals */ || symbol.escapedName === "default" /* Default */);
        }