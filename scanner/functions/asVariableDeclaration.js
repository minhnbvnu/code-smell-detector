function asVariableDeclaration(variableDeclaration) {
                if (typeof variableDeclaration === "string" || variableDeclaration && !isVariableDeclaration(variableDeclaration)) {
                    return createVariableDeclaration(variableDeclaration, 
                    /*exclamationToken*/
                    void 0, 
                    /*type*/
                    void 0, 
                    /*initializer*/
                    void 0);
                }
                return variableDeclaration;
            }