function checkGrammarVariableDeclarationList(declarationList) {
                const declarations = declarationList.declarations;
                if (checkGrammarForDisallowedTrailingComma(declarationList.declarations)) {
                    return true;
                }
                if (!declarationList.declarations.length) {
                    return grammarErrorAtPos(declarationList, declarations.pos, declarations.end - declarations.pos, Diagnostics.Variable_declaration_list_cannot_be_empty);
                }
                return false;
            }