function checkGrammarIndexSignature(node) {
                return checkGrammarModifiers(node) || checkGrammarIndexSignatureParameters(node);
            }