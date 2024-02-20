function doChangeNamespaceToNamed(sourceFile, checker, changes, toConvert, allowSyntheticDefaultImports) {
            let usedAsNamespaceOrDefault = false;
            const nodesToReplace = [];
            const conflictingNames = /* @__PURE__ */ new Map();
            ts_FindAllReferences_exports.Core.eachSymbolReferenceInFile(toConvert.name, checker, sourceFile, (id) => {
                if (!isPropertyAccessOrQualifiedName(id.parent)) {
                    usedAsNamespaceOrDefault = true;
                }
                else {
                    const exportName = getRightOfPropertyAccessOrQualifiedName(id.parent).text;
                    if (checker.resolveName(exportName, id, 67108863 /* All */, 
                    /*excludeGlobals*/
                    true)) {
                        conflictingNames.set(exportName, true);
                    }
                    Debug.assert(getLeftOfPropertyAccessOrQualifiedName(id.parent) === id, "Parent expression should match id");
                    nodesToReplace.push(id.parent);
                }
            });
            const exportNameToImportName = /* @__PURE__ */ new Map();
            for (const propertyAccessOrQualifiedName of nodesToReplace) {
                const exportName = getRightOfPropertyAccessOrQualifiedName(propertyAccessOrQualifiedName).text;
                let importName = exportNameToImportName.get(exportName);
                if (importName === void 0) {
                    exportNameToImportName.set(exportName, importName = conflictingNames.has(exportName) ? getUniqueName(exportName, sourceFile) : exportName);
                }
                changes.replaceNode(sourceFile, propertyAccessOrQualifiedName, factory.createIdentifier(importName));
            }
            const importSpecifiers = [];
            exportNameToImportName.forEach((name, propertyName) => {
                importSpecifiers.push(factory.createImportSpecifier(
                /*isTypeOnly*/
                false, name === propertyName ? void 0 : factory.createIdentifier(propertyName), factory.createIdentifier(name)));
            });
            const importDecl = toConvert.parent.parent;
            if (usedAsNamespaceOrDefault && !allowSyntheticDefaultImports) {
                changes.insertNodeAfter(sourceFile, importDecl, updateImport(importDecl, 
                /*defaultImportName*/
                void 0, importSpecifiers));
            }
            else {
                changes.replaceNode(sourceFile, importDecl, updateImport(importDecl, usedAsNamespaceOrDefault ? factory.createIdentifier(toConvert.name.text) : void 0, importSpecifiers));
            }
        }