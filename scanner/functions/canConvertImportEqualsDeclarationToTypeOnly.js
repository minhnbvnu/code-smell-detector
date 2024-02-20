function canConvertImportEqualsDeclarationToTypeOnly(statement) {
                return isImportEqualsDeclaration(statement) && isExternalModuleReference(statement.moduleReference) && !statement.isTypeOnly && getSymbolOfDeclaration(statement).isReferenced && !isReferencedAliasDeclaration(statement, 
                /*checkChildren*/
                false) && !getSymbolLinks(getSymbolOfDeclaration(statement)).constEnumReferenced;
            }