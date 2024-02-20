function checkGrammarFunctionLikeDeclaration(node) {
                const file = getSourceFileOfNode(node);
                return checkGrammarModifiers(node) || checkGrammarTypeParameterList(node.typeParameters, file) || checkGrammarParameterList(node.parameters) || checkGrammarArrowFunction(node, file) || isFunctionLikeDeclaration(node) && checkGrammarForUseStrictSimpleParameterList(node);
            }