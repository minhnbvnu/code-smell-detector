function getAssertion(sourceFile, pos) {
            if (isInJSFile(sourceFile))
                return void 0;
            return findAncestor(getTokenAtPosition(sourceFile, pos), (n) => isAsExpression(n) || isTypeAssertionExpression(n));
        }