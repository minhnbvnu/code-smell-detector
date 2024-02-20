function updateNamespaceLikeImport(changes, sourceFile, checker, movedSymbols, newModuleSpecifier, oldImportId, oldImportNode) {
            const preferredNewNamespaceName = ts_codefix_exports.moduleSpecifierToValidIdentifier(newModuleSpecifier, 99 /* ESNext */);
            let needUniqueName = false;
            const toChange = [];
            ts_FindAllReferences_exports.Core.eachSymbolReferenceInFile(oldImportId, checker, sourceFile, (ref) => {
                if (!isPropertyAccessExpression(ref.parent))
                    return;
                needUniqueName = needUniqueName || !!checker.resolveName(preferredNewNamespaceName, ref, 67108863 /* All */, 
                /*excludeGlobals*/
                true);
                if (movedSymbols.has(checker.getSymbolAtLocation(ref.parent.name))) {
                    toChange.push(ref);
                }
            });
            if (toChange.length) {
                const newNamespaceName = needUniqueName ? getUniqueName(preferredNewNamespaceName, sourceFile) : preferredNewNamespaceName;
                for (const ref of toChange) {
                    changes.replaceNode(sourceFile, ref, factory.createIdentifier(newNamespaceName));
                }
                changes.insertNodeAfter(sourceFile, oldImportNode, updateNamespaceLikeImportNode(oldImportNode, preferredNewNamespaceName, newModuleSpecifier));
            }
        }