function createMissingIndexSignatureDeclaration(type, kind) {
                const indexInfoOfKind = checker.getIndexInfoOfType(type, kind);
                if (indexInfoOfKind) {
                    insertInterfaceMemberNode(sourceFile, classDeclaration, checker.indexInfoToIndexSignatureDeclaration(indexInfoOfKind, classDeclaration, 
                    /*flags*/
                    void 0, getNoopSymbolTrackerWithResolver(context)));
                }
            }