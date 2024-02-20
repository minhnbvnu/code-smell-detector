function findAllInitialDeclarations(typeChecker, node) {
            const symbol = getSymbolOfCallHierarchyDeclaration(typeChecker, node);
            let declarations;
            if (symbol && symbol.declarations) {
                const indices = indicesOf(symbol.declarations);
                const keys = map(symbol.declarations, (decl) => ({ file: decl.getSourceFile().fileName, pos: decl.pos }));
                indices.sort((a, b) => compareStringsCaseSensitive(keys[a].file, keys[b].file) || keys[a].pos - keys[b].pos);
                const sortedDeclarations = map(indices, (i) => symbol.declarations[i]);
                let lastDecl;
                for (const decl of sortedDeclarations) {
                    if (isValidCallHierarchyDeclaration(decl)) {
                        if (!lastDecl || lastDecl.parent !== decl.parent || lastDecl.end !== decl.pos) {
                            declarations = append(declarations, decl);
                        }
                        lastDecl = decl;
                    }
                }
            }
            return declarations;
        }