function addToSymbolTable(target, source, message) {
                source.forEach((sourceSymbol, id) => {
                    const targetSymbol = target.get(id);
                    if (targetSymbol) {
                        forEach(targetSymbol.declarations, addDeclarationDiagnostic(unescapeLeadingUnderscores(id), message));
                    }
                    else {
                        target.set(id, sourceSymbol);
                    }
                });
                function addDeclarationDiagnostic(id, message2) {
                    return (declaration) => diagnostics.add(createDiagnosticForNode(declaration, message2, id));
                }
            }