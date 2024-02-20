function getPaddingLineSequences(prevNode, nextNode) {
                const pairs = [];
                let prevToken = getActualLastToken(prevNode, sourceCode);
                if (nextNode.loc.start.line - prevToken.loc.end.line >= 2) {
                    do {
                        const token = sourceCode.getTokenAfter(prevToken, {
                            includeComments: true,
                        });
                        if (token.loc.start.line - prevToken.loc.end.line >= 2) {
                            pairs.push([prevToken, token]);
                        }
                        prevToken = token;
                    } while (prevToken.range[0] < nextNode.range[0]);
                }
                return pairs;
            }