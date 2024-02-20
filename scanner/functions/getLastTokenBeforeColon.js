function getLastTokenBeforeColon(node) {
                const colonToken = sourceCode.getTokenAfter(node, util.isColonToken);
                return sourceCode.getTokenBefore(colonToken);
            }