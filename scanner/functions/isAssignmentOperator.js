function isAssignmentOperator(operator) {
        return (operator.kind >= SyntaxKind.FirstAssignment &&
            operator.kind <= SyntaxKind.LastAssignment);
    }