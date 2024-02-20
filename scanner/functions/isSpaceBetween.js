function isSpaceBetween(sourceCode, first, second, checkInsideOfJSXText) {
        if (nodesOrTokensOverlap(first, second)) {
            return false;
        }
        const [startingNodeOrToken, endingNodeOrToken] = first.range[1] <= second.range[0]
            ? [first, second]
            : [second, first];
        const firstToken = sourceCode.getLastToken(startingNodeOrToken) || startingNodeOrToken;
        const finalToken = sourceCode.getFirstToken(endingNodeOrToken) || endingNodeOrToken;
        let currentToken = firstToken;
        while (currentToken !== finalToken) {
            const nextToken = sourceCode.getTokenAfter(currentToken, { includeComments: true });
            if (currentToken.range[1] !== nextToken.range[0] ||
                /*
                 * For backward compatibility, check spaces in JSXText.
                 * https://github.com/eslint/eslint/issues/12614
                 */
                (checkInsideOfJSXText &&
                    nextToken !== finalToken &&
                    nextToken.type === "JSXText" &&
                    /\s/u.test(nextToken.value))) {
                return true;
            }
            currentToken = nextToken;
        }
        return false;
    }