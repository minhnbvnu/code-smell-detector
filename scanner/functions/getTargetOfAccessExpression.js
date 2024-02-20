function getTargetOfAccessExpression(node, dontRecursivelyResolve) {
                if (!(isBinaryExpression(node.parent) && node.parent.left === node && node.parent.operatorToken.kind === 63 /* EqualsToken */)) {
                    return void 0;
                }
                return getTargetOfAliasLikeExpression(node.parent.right, dontRecursivelyResolve);
            }