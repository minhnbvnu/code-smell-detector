function getParentNodeOfToken(token) {
                const node = sourceCode.getNodeByRangeIndex(token.range[0]);
                return node;
            }