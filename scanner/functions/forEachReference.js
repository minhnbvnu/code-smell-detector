function forEachReference(node, checker, onReference) {
            node.forEachChild(function cb(node2) {
                if (isIdentifier(node2) && !isDeclarationName(node2)) {
                    const sym = checker.getSymbolAtLocation(node2);
                    if (sym)
                        onReference(sym);
                }
                else {
                    node2.forEachChild(cb);
                }
            });
        }