function checkClassExpression(node) {
                checkClassLikeDeclaration(node);
                checkNodeDeferred(node);
                checkClassExpressionExternalHelpers(node);
                return getTypeOfSymbol(getSymbolOfDeclaration(node));
            }