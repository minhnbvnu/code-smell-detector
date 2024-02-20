function getExpression(node) {
            if (isValidExpression(node)) {
                return node;
            }
            if (isVariableStatement(node)) {
                const variable = getSingleVariableOfVariableStatement(node);
                const initializer = variable == null ? void 0 : variable.initializer;
                return initializer && isValidExpression(initializer) ? initializer : void 0;
            }
            return node.expression && isValidExpression(node.expression) ? node.expression : void 0;
        }