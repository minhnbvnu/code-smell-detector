function createDefaultValueCheck(flattenContext, value, defaultValue, location) {
            value = ensureIdentifier(flattenContext, value, 
            /*reuseIdentifierExpressions*/
            true, location);
            return flattenContext.context.factory.createConditionalExpression(flattenContext.context.factory.createTypeCheck(value, "undefined"), 
            /*questionToken*/
            void 0, defaultValue, 
            /*colonToken*/
            void 0, value);
        }