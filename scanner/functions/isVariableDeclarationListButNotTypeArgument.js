function isVariableDeclarationListButNotTypeArgument(node2) {
                return node2.parent.kind === 258 /* VariableDeclarationList */ && !isPossiblyTypeArgumentPosition(node2, sourceFile, typeChecker);
            }