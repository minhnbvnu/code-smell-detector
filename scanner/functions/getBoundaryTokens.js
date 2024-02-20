function getBoundaryTokens(curNode, nextNode) {
                const lastToken = sourceCode.getLastToken(curNode);
                const prevToken = sourceCode.getTokenBefore(lastToken);
                const nextToken = sourceCode.getFirstToken(nextNode); // skip possible lone `;` between nodes
                const isSemicolonLessStyle = (astUtils.isSemicolonToken(lastToken) &&
                    !astUtils.isTokenOnSameLine(prevToken, lastToken) &&
                    astUtils.isTokenOnSameLine(lastToken, nextToken));
                return isSemicolonLessStyle
                    ? { curLast: prevToken, nextFirst: lastToken }
                    : { curLast: lastToken, nextFirst: nextToken };
            }