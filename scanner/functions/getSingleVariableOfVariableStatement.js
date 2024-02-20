function getSingleVariableOfVariableStatement(node) {
            return isVariableStatement(node) ? firstOrUndefined(node.declarationList.declarations) : void 0;
        }