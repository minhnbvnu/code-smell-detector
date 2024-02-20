function getClassOrInterfaceDeclarationsOfSymbol(symbol) {
                return filter(symbol.declarations, (d) => d.kind === 260 /* ClassDeclaration */ || d.kind === 261 /* InterfaceDeclaration */);
            }