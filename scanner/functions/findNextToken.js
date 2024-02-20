function findNextToken(previousToken, parent, ast) {
        return find(parent);
        function find(n) {
            if (ts.isToken(n) && n.pos === previousToken.end) {
                // this is token that starts at the end of previous token - return it
                return n;
            }
            return firstDefined(n.getChildren(ast), (child) => {
                const shouldDiveInChildNode = 
                // previous token is enclosed somewhere in the child
                (child.pos <= previousToken.pos && child.end > previousToken.end) ||
                    // previous token ends exactly at the beginning of child
                    child.pos === previousToken.end;
                return shouldDiveInChildNode && nodeHasTokens(child, ast)
                    ? find(child)
                    : undefined;
            });
        }
    }