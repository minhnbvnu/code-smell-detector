function checkGrammarClassLikeDeclaration(node) {
                const file = getSourceFileOfNode(node);
                return checkGrammarClassDeclarationHeritageClauses(node) || checkGrammarTypeParameterList(node.typeParameters, file);
            }