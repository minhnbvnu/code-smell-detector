function containsPrecedingToken(startingToken, sourceFile, container) {
            const pos = startingToken.getFullStart();
            let currentParent = startingToken.parent;
            while (currentParent) {
                const precedingToken = findPrecedingToken(pos, sourceFile, currentParent, 
                /*excludeJsdoc*/
                true);
                if (precedingToken) {
                    return rangeContainsRange(container, precedingToken);
                }
                currentParent = currentParent.parent;
            }
            return Debug.fail("Could not find preceding token");
        }