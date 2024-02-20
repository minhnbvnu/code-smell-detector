function typeToAutoImportableTypeNode(checker, importAdder, type, contextNode, scriptTarget, flags, tracker) {
            let typeNode = checker.typeToTypeNode(type, contextNode, flags, tracker);
            if (typeNode && isImportTypeNode(typeNode)) {
                const importableReference = tryGetAutoImportableReferenceFromTypeNode(typeNode, scriptTarget);
                if (importableReference) {
                    importSymbols(importAdder, importableReference.symbols);
                    typeNode = importableReference.typeNode;
                }
            }
            return getSynthesizedDeepClone(typeNode);
        }