function doChangeNamedToNamespaceOrDefault(sourceFile, program, changes, toConvert, shouldUseDefault = getShouldUseDefault(program, toConvert.parent)) {
            const checker = program.getTypeChecker();
            const importDecl = toConvert.parent.parent;
            const { moduleSpecifier } = importDecl;
            const toConvertSymbols = /* @__PURE__ */ new Set();
            toConvert.elements.forEach((namedImport) => {
                const symbol = checker.getSymbolAtLocation(namedImport.name);
                if (symbol) {
                    toConvertSymbols.add(symbol);
                }
            });
            const preferredName = moduleSpecifier && isStringLiteral(moduleSpecifier) ? ts_codefix_exports.moduleSpecifierToValidIdentifier(moduleSpecifier.text, 99 /* ESNext */) : "module";
            function hasNamespaceNameConflict(namedImport) {
                return !!ts_FindAllReferences_exports.Core.eachSymbolReferenceInFile(namedImport.name, checker, sourceFile, (id) => {
                    const symbol = checker.resolveName(preferredName, id, 67108863 /* All */, 
                    /*excludeGlobals*/
                    true);
                    if (symbol) {
                        if (toConvertSymbols.has(symbol)) {
                            return isExportSpecifier(id.parent);
                        }
                        return true;
                    }
                    return false;
                });
            }
            const namespaceNameConflicts = toConvert.elements.some(hasNamespaceNameConflict);
            const namespaceImportName = namespaceNameConflicts ? getUniqueName(preferredName, sourceFile) : preferredName;
            const neededNamedImports = /* @__PURE__ */ new Set();
            for (const element of toConvert.elements) {
                const propertyName = (element.propertyName || element.name).text;
                ts_FindAllReferences_exports.Core.eachSymbolReferenceInFile(element.name, checker, sourceFile, (id) => {
                    const access = factory.createPropertyAccessExpression(factory.createIdentifier(namespaceImportName), propertyName);
                    if (isShorthandPropertyAssignment(id.parent)) {
                        changes.replaceNode(sourceFile, id.parent, factory.createPropertyAssignment(id.text, access));
                    }
                    else if (isExportSpecifier(id.parent)) {
                        neededNamedImports.add(element);
                    }
                    else {
                        changes.replaceNode(sourceFile, id, access);
                    }
                });
            }
            changes.replaceNode(sourceFile, toConvert, shouldUseDefault ? factory.createIdentifier(namespaceImportName) : factory.createNamespaceImport(factory.createIdentifier(namespaceImportName)));
            if (neededNamedImports.size) {
                const newNamedImports = arrayFrom(neededNamedImports.values(), (element) => factory.createImportSpecifier(element.isTypeOnly, element.propertyName && factory.createIdentifier(element.propertyName.text), factory.createIdentifier(element.name.text)));
                changes.insertNodeAfter(sourceFile, toConvert.parent.parent, updateImport(importDecl, 
                /*defaultImportName*/
                void 0, newNamedImports));
            }
        }