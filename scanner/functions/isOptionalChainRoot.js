function isOptionalChainRoot(node) {
            return isOptionalChain(node) && !isNonNullExpression(node) && !!node.questionDotToken;
        }