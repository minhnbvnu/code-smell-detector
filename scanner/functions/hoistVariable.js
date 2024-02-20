function hoistVariable({ name }) {
                if (isIdentifier(name)) {
                    hoistVariableDeclaration(name);
                }
                else {
                    for (const element of name.elements) {
                        if (!isOmittedExpression(element)) {
                            hoistVariable(element);
                        }
                    }
                }
            }