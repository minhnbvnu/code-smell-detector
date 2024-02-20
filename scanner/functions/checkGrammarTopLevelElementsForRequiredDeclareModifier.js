function checkGrammarTopLevelElementsForRequiredDeclareModifier(file) {
                for (const decl of file.statements) {
                    if (isDeclaration(decl) || decl.kind === 240 /* VariableStatement */) {
                        if (checkGrammarTopLevelElementForRequiredDeclareModifier(decl)) {
                            return true;
                        }
                    }
                }
                return false;
            }