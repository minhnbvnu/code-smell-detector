function getEffectiveInitializer(node) {
            if (isInJSFile(node) && node.initializer && isBinaryExpression(node.initializer) && (node.initializer.operatorToken.kind === 56 /* BarBarToken */ || node.initializer.operatorToken.kind === 60 /* QuestionQuestionToken */) && node.name && isEntityNameExpression(node.name) && isSameEntityName(node.name, node.initializer.left)) {
                return node.initializer.right;
            }
            return node.initializer;
        }