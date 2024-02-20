function isOptional(node) {
        return node.questionToken
            ? node.questionToken.kind === SyntaxKind.QuestionToken
            : false;
    }