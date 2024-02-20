function findClosingParen(node) {
                let nodeToCheck = node;
                while (!astUtils.isParenthesised(sourceCode, nodeToCheck)) {
                    nodeToCheck = nodeToCheck.parent;
                }
                return sourceCode.getTokenAfter(nodeToCheck);
            }