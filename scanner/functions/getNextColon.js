function getNextColon(node) {
                return sourceCode.getTokenAfter(node, astUtils.isColonToken);
            }