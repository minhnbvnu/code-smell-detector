function addNullElementsToIgnoreList(node) {
                let previousToken = sourceCode.getFirstToken(node);
                for (const element of node.elements) {
                    let token;
                    if (element == null) {
                        token = sourceCode.getTokenAfter(previousToken);
                        if (token && (0, util_1.isCommaToken)(token)) {
                            ignoredTokens.add(token);
                        }
                    }
                    else {
                        token = sourceCode.getTokenAfter(element);
                    }
                    previousToken = token;
                }
            }