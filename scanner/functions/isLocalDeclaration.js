function isLocalDeclaration(decl, sourceFile) {
            if (isBindingElement(decl)) {
                decl = getDeclarationForBindingElement(decl);
            }
            if (isVariableDeclaration(decl)) {
                return (!isSourceFile(decl.parent.parent.parent) || isCatchClause(decl.parent)) && decl.getSourceFile() === sourceFile;
            }
            else if (isFunctionDeclaration(decl)) {
                return !isSourceFile(decl.parent) && decl.getSourceFile() === sourceFile;
            }
            return false;
        }