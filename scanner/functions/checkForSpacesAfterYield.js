function checkForSpacesAfterYield(node) {
                const tokens = sourceCode.getFirstTokens(node, 3), word = "yield";
                if (!node.argument || node.delegate) {
                    return;
                }
                checkUnaryWordOperatorForSpaces(node, tokens[0], tokens[1], word);
            }