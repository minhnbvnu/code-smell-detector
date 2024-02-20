function checkGrammarForInvalidDynamicName(node, message) {
                if (isNonBindableDynamicName(node)) {
                    return grammarErrorOnNode(node, message);
                }
            }