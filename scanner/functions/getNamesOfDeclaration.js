function getNamesOfDeclaration(statement) {
                        if (isVariableStatement(statement)) {
                            return filter(map(statement.declarationList.declarations, getNameOfDeclaration), isIdentifierAndNotUndefined);
                        }
                        return filter([getNameOfDeclaration(statement)], isIdentifierAndNotUndefined);
                    }