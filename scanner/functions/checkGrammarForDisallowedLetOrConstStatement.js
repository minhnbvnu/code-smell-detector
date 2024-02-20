function checkGrammarForDisallowedLetOrConstStatement(node) {
                if (!allowLetAndConstDeclarations(node.parent)) {
                    if (isLet(node.declarationList)) {
                        return grammarErrorOnNode(node, Diagnostics.let_declarations_can_only_be_declared_inside_a_block);
                    }
                    else if (isVarConst(node.declarationList)) {
                        return grammarErrorOnNode(node, Diagnostics.const_declarations_can_only_be_declared_inside_a_block);
                    }
                }
            }