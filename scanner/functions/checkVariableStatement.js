function checkVariableStatement(node) {
                if (!checkGrammarModifiers(node) && !checkGrammarVariableDeclarationList(node.declarationList))
                    checkGrammarForDisallowedLetOrConstStatement(node);
                forEach(node.declarationList.declarations, checkSourceElement);
            }