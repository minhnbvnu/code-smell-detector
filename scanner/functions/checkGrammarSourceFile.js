function checkGrammarSourceFile(node) {
                return !!(node.flags & 16777216 /* Ambient */) && checkGrammarTopLevelElementsForRequiredDeclareModifier(node);
            }