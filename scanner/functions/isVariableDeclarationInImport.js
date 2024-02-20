function isVariableDeclarationInImport(decl) {
            return isSourceFile(decl.parent.parent.parent) && !!decl.initializer && isRequireCall(decl.initializer, 
            /*checkArgumentIsStringLiteralLike*/
            true);
        }