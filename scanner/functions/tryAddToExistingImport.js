function tryAddToExistingImport(existingImports, isValidTypeOnlyUseSite, checker, compilerOptions) {
            return firstDefined(existingImports, ({ declaration, importKind, symbol, targetFlags }) => {
                if (importKind === 3 /* CommonJS */ || importKind === 2 /* Namespace */ || declaration.kind === 268 /* ImportEqualsDeclaration */) {
                    return void 0;
                }
                if (declaration.kind === 257 /* VariableDeclaration */) {
                    return (importKind === 0 /* Named */ || importKind === 1 /* Default */) && declaration.name.kind === 203 /* ObjectBindingPattern */ ? { kind: 2 /* AddToExisting */, importClauseOrBindingPattern: declaration.name, importKind, moduleSpecifier: declaration.initializer.arguments[0].text, addAsTypeOnly: 4 /* NotAllowed */ } : void 0;
                }
                const { importClause } = declaration;
                if (!importClause || !isStringLiteralLike(declaration.moduleSpecifier))
                    return void 0;
                const { name, namedBindings } = importClause;
                if (importClause.isTypeOnly && !(importKind === 0 /* Named */ && namedBindings))
                    return void 0;
                const addAsTypeOnly = getAddAsTypeOnly(isValidTypeOnlyUseSite, 
                /*isForNewImportDeclaration*/
                false, symbol, targetFlags, checker, compilerOptions);
                if (importKind === 1 /* Default */ && (name || // Cannot add a default import to a declaration that already has one
                    addAsTypeOnly === 2 /* Required */ && namedBindings))
                    return void 0;
                if (importKind === 0 /* Named */ && (namedBindings == null ? void 0 : namedBindings.kind) === 271 /* NamespaceImport */)
                    return void 0;
                return {
                    kind: 2 /* AddToExisting */,
                    importClauseOrBindingPattern: importClause,
                    importKind,
                    moduleSpecifier: declaration.moduleSpecifier.text,
                    addAsTypeOnly
                };
            });
        }