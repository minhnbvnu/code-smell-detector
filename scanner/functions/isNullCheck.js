function isNullCheck(node) {
                return astUtils.isNullLiteral(node.right) || astUtils.isNullLiteral(node.left);
            }