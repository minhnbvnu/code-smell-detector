function getDirectImportsMap(sourceFiles, checker, cancellationToken) {
            const map2 = /* @__PURE__ */ new Map();
            for (const sourceFile of sourceFiles) {
                if (cancellationToken)
                    cancellationToken.throwIfCancellationRequested();
                forEachImport(sourceFile, (importDecl, moduleSpecifier) => {
                    const moduleSymbol = checker.getSymbolAtLocation(moduleSpecifier);
                    if (moduleSymbol) {
                        const id = getSymbolId(moduleSymbol).toString();
                        let imports = map2.get(id);
                        if (!imports) {
                            map2.set(id, imports = []);
                        }
                        imports.push(importDecl);
                    }
                });
            }
            return map2;
        }