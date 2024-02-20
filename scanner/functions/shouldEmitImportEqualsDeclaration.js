function shouldEmitImportEqualsDeclaration(node) {
                return shouldEmitAliasDeclaration(node) || !isExternalModule(currentSourceFile) && resolver.isTopLevelValueImportEqualsWithEntityName(node);
            }