function removeUnusedImports(oldImports, sourceFile, program) {
            const typeChecker = program.getTypeChecker();
            const compilerOptions = program.getCompilerOptions();
            const jsxNamespace = typeChecker.getJsxNamespace(sourceFile);
            const jsxFragmentFactory = typeChecker.getJsxFragmentFactory(sourceFile);
            const jsxElementsPresent = !!(sourceFile.transformFlags & 2 /* ContainsJsx */);
            const usedImports = [];
            for (const importDecl of oldImports) {
                const { importClause, moduleSpecifier } = importDecl;
                if (!importClause) {
                    usedImports.push(importDecl);
                    continue;
                }
                let { name, namedBindings } = importClause;
                if (name && !isDeclarationUsed(name)) {
                    name = void 0;
                }
                if (namedBindings) {
                    if (isNamespaceImport(namedBindings)) {
                        if (!isDeclarationUsed(namedBindings.name)) {
                            namedBindings = void 0;
                        }
                    }
                    else {
                        const newElements = namedBindings.elements.filter((e) => isDeclarationUsed(e.name));
                        if (newElements.length < namedBindings.elements.length) {
                            namedBindings = newElements.length ? factory.updateNamedImports(namedBindings, newElements) : void 0;
                        }
                    }
                }
                if (name || namedBindings) {
                    usedImports.push(updateImportDeclarationAndClause(importDecl, name, namedBindings));
                }
                else if (hasModuleDeclarationMatchingSpecifier(sourceFile, moduleSpecifier)) {
                    if (sourceFile.isDeclarationFile) {
                        usedImports.push(factory.createImportDeclaration(importDecl.modifiers, 
                        /*importClause*/
                        void 0, moduleSpecifier, 
                        /*assertClause*/
                        void 0));
                    }
                    else {
                        usedImports.push(importDecl);
                    }
                }
            }
            return usedImports;
            function isDeclarationUsed(identifier) {
                return jsxElementsPresent && (identifier.text === jsxNamespace || jsxFragmentFactory && identifier.text === jsxFragmentFactory) && jsxModeNeedsExplicitImport(compilerOptions.jsx) || ts_FindAllReferences_exports.Core.isSymbolReferencedInFile(identifier, typeChecker, sourceFile);
            }
        }