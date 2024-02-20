function isTemplateLiteralContext(node) {
                const parent2 = node.parent;
                return isParenthesizedExpression(parent2) && isTemplateLiteralContext(parent2) || isElementAccessExpression(parent2) && parent2.argumentExpression === node;
            }