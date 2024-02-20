function getCallSignatureDefinition() {
                return isCallOrNewExpressionTarget(node) || isNameOfFunctionDeclaration(node) ? getSignatureDefinition(filteredDeclarations, 
                /*selectConstructors*/
                false) : void 0;
            }