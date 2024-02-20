function* fixWithRightOperand(fixer, node, kind, isNegative, isOptional) {
                // left is CallExpression or MemberExpression.
                const leftNode = getLeftNode(node.left);
                const propertyRange = getPropertyRange(leftNode);
                if (isNegative) {
                    yield fixer.insertTextBefore(node, '!');
                }
                yield fixer.replaceTextRange([propertyRange[0], node.right.range[0]], `${isOptional ? '?.' : '.'}${kind}sWith(`);
                yield fixer.replaceTextRange([node.right.range[1], node.range[1]], ')');
            }