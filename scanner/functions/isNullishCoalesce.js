function isNullishCoalesce(node) {
            return node.kind === 223 /* BinaryExpression */ && node.operatorToken.kind === 60 /* QuestionQuestionToken */;
        }