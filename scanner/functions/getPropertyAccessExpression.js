function getPropertyAccessExpression(sourceFile, pos) {
            return cast(getTokenAtPosition(sourceFile, pos).parent, isPropertyAccessExpression);
        }