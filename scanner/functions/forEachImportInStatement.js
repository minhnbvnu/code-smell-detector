function forEachImportInStatement(statement, cb) {
            if (isImportDeclaration(statement)) {
                if (isStringLiteral(statement.moduleSpecifier))
                    cb(statement);
            }
            else if (isImportEqualsDeclaration(statement)) {
                if (isExternalModuleReference(statement.moduleReference) && isStringLiteralLike(statement.moduleReference.expression)) {
                    cb(statement);
                }
            }
            else if (isVariableStatement(statement)) {
                for (const decl of statement.declarationList.declarations) {
                    if (decl.initializer && isRequireCall(decl.initializer, 
                    /*checkArgumentIsStringLiteralLike*/
                    true)) {
                        cb(decl);
                    }
                }
            }
        }