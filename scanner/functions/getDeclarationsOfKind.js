function getDeclarationsOfKind(symbol, kind) {
            return filter(symbol.declarations || emptyArray, (d) => d.kind === kind);
        }