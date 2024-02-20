function parseConciseBody() {
        if (match('{')) {
            return parseFunctionSourceElements();
        }
        return parseAssignmentExpression();
    }