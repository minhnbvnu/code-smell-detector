function checkPrivateIdentifierExpression(privId) {
                checkGrammarPrivateIdentifierExpression(privId);
                const symbol = getSymbolForPrivateIdentifierExpression(privId);
                if (symbol) {
                    markPropertyAsReferenced(symbol, 
                    /* nodeForCheckWriteOnly: */
                    void 0, 
                    /* isThisAccess: */
                    false);
                }
                return anyType;
            }