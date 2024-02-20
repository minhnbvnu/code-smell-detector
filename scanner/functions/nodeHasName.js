function nodeHasName(statement, name) {
            if (isNamedDeclaration(statement) && isIdentifier(statement.name) && idText(statement.name) === idText(name)) {
                return true;
            }
            if (isVariableStatement(statement) && some(statement.declarationList.declarations, (d) => nodeHasName(d, name))) {
                return true;
            }
            return false;
        }