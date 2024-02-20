function canConvertImportDeclarationToTypeOnly(statement) {
                return isImportDeclaration(statement) && statement.importClause && !statement.importClause.isTypeOnly && importClauseContainsReferencedImport(statement.importClause) && !isReferencedAliasDeclaration(statement.importClause, 
                /*checkChildren*/
                true) && !importClauseContainsConstEnumUsedAsValue(statement.importClause);
            }