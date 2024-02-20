function getRequiresAtTopOfFile(sourceFile) {
            let nonRequireStatementCount = 0;
            let requires;
            for (const statement of sourceFile.statements) {
                if (nonRequireStatementCount > 3) {
                    break;
                }
                if (isRequireVariableStatement(statement)) {
                    requires = concatenate(requires, statement.declarationList.declarations.map((d) => d.initializer));
                }
                else if (isExpressionStatement(statement) && isRequireCall(statement.expression, 
                /*requireStringLiteralLikeArgument*/
                true)) {
                    requires = append(requires, statement.expression);
                }
                else {
                    nonRequireStatementCount++;
                }
            }
            return requires || emptyArray;
        }