function isLabelName(node) {
            return isLabelOfLabeledStatement(node) || isJumpStatementTarget(node);
        }