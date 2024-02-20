function ensureIdentifier(flattenContext, value, reuseIdentifierExpressions, location) {
            if (isIdentifier(value) && reuseIdentifierExpressions) {
                return value;
            }
            else {
                const temp = flattenContext.context.factory.createTempVariable(
                /*recordTempVariable*/
                void 0);
                if (flattenContext.hoistTempVariables) {
                    flattenContext.context.hoistVariableDeclaration(temp);
                    flattenContext.emitExpression(setTextRange(flattenContext.context.factory.createAssignment(temp, value), location));
                }
                else {
                    flattenContext.emitBindingOrAssignment(temp, value, location, 
                    /*original*/
                    void 0);
                }
                return temp;
            }
        }