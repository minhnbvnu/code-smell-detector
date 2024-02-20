function deleteUnusedImportsInDeclaration(sourceFile, importDecl, changes, isUnused) {
            if (!importDecl.importClause)
                return;
            const { name, namedBindings } = importDecl.importClause;
            const defaultUnused = !name || isUnused(name);
            const namedBindingsUnused = !namedBindings || (namedBindings.kind === 271 /* NamespaceImport */ ? isUnused(namedBindings.name) : namedBindings.elements.length !== 0 && namedBindings.elements.every((e) => isUnused(e.name)));
            if (defaultUnused && namedBindingsUnused) {
                changes.delete(sourceFile, importDecl);
            }
            else {
                if (name && defaultUnused) {
                    changes.delete(sourceFile, name);
                }
                if (namedBindings) {
                    if (namedBindingsUnused) {
                        changes.replaceNode(sourceFile, importDecl.importClause, factory.updateImportClause(importDecl.importClause, importDecl.importClause.isTypeOnly, name, 
                        /*namedBindings*/
                        void 0));
                    }
                    else if (namedBindings.kind === 272 /* NamedImports */) {
                        for (const element of namedBindings.elements) {
                            if (isUnused(element.name))
                                changes.delete(sourceFile, element);
                        }
                    }
                }
            }
        }