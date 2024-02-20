function getNodeOfSymbol(symbol) {
            if (symbol.valueDeclaration === void 0) {
                return firstOrUndefined(symbol.declarations);
            }
            const declaration = symbol.valueDeclaration;
            const variableStatement = isVariableDeclaration(declaration) ? tryCast(declaration.parent.parent, isVariableStatement) : void 0;
            return variableStatement && length(variableStatement.declarationList.declarations) === 1 ? variableStatement : declaration;
        }