function getVariableInfo(func) {
            const variableDeclaration = func.parent;
            if (!isVariableDeclaration(variableDeclaration) || !isVariableDeclarationInVariableStatement(variableDeclaration))
                return void 0;
            const variableDeclarationList = variableDeclaration.parent;
            const statement = variableDeclarationList.parent;
            if (!isVariableDeclarationList(variableDeclarationList) || !isVariableStatement(statement) || !isIdentifier(variableDeclaration.name))
                return void 0;
            return { variableDeclaration, variableDeclarationList, statement, name: variableDeclaration.name };
        }