function checkGrammarTypeArguments(node, typeArguments) {
                return checkGrammarForDisallowedTrailingComma(typeArguments) || checkGrammarForAtLeastOneTypeArgument(node, typeArguments);
            }