function parseNameOfClassDeclarationOrExpression() {
                        return isBindingIdentifier() && !isImplementsClause() ? createIdentifier(isBindingIdentifier()) : void 0;
                    }