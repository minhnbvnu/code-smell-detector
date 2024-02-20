function fixNonStringBinaryExpression(fixer, node) {
                const topBinaryExpr = getTopConcatBinaryExpression(node.parent);
                if (hasOctalOrNonOctalDecimalEscapeSequence(topBinaryExpr)) {
                    return null;
                }
                return fixer.replaceText(topBinaryExpr, getTemplateLiteral(topBinaryExpr, null, null));
            }