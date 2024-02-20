function checkForSpacesAfterAwait(node) {
                const tokens = sourceCode.getFirstTokens(node, 3);
                checkUnaryWordOperatorForSpaces(node, tokens[0], tokens[1], "await");
            }