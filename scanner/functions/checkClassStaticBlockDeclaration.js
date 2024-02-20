function checkClassStaticBlockDeclaration(node) {
                checkGrammarModifiers(node);
                forEachChild(node, checkSourceElement);
            }