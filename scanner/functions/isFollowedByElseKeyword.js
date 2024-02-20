function isFollowedByElseKeyword(node) {
                const nextToken = sourceCode.getTokenAfter(node);
                return Boolean(nextToken) && isElseKeywordToken(nextToken);
            }