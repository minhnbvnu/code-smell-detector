function getSourceFileLikeForImportDeclaration(node) {
            if (node.kind === 210 /* CallExpression */) {
                return node.getSourceFile();
            }
            const { parent: parent2 } = node;
            if (parent2.kind === 308 /* SourceFile */) {
                return parent2;
            }
            Debug.assert(parent2.kind === 265 /* ModuleBlock */);
            return cast(parent2.parent, isAmbientModuleDeclaration);
        }