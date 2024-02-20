function isOnSameLineWithNextToken(node) {
                const prevToken = sourceCode.getLastToken(node, 1);
                const nextToken = sourceCode.getTokenAfter(node);
                return !!nextToken && astUtils.isTokenOnSameLine(prevToken, nextToken);
            }