function isMixedWithParent(node) {
                return (node.operator !== node.parent.operator &&
                    !astUtils.isParenthesised(sourceCode, node));
            }