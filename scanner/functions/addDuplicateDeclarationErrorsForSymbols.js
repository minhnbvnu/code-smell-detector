function addDuplicateDeclarationErrorsForSymbols(target, message, symbolName2, source) {
                forEach(target.declarations, (node) => {
                    addDuplicateDeclarationError(node, message, symbolName2, source.declarations);
                });
            }