function tryReplaceImportTypeNodeWithAutoImport(typeNode, declaration, sourceFile, changes, importAdder, scriptTarget) {
            const importableReference = tryGetAutoImportableReferenceFromTypeNode(typeNode, scriptTarget);
            if (importableReference && changes.tryInsertTypeAnnotation(sourceFile, declaration, importableReference.typeNode)) {
                forEach(importableReference.symbols, (s) => importAdder.addImportFromExportedSymbol(s, 
                /*usageIsTypeOnly*/
                true));
                return true;
            }
            return false;
        }