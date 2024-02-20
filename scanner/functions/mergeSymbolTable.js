function mergeSymbolTable(target, source, unidirectional = false) {
                source.forEach((sourceSymbol, id) => {
                    const targetSymbol = target.get(id);
                    target.set(id, targetSymbol ? mergeSymbol(targetSymbol, sourceSymbol, unidirectional) : getMergedSymbol(sourceSymbol));
                });
            }