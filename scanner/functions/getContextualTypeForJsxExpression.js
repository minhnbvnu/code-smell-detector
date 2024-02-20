function getContextualTypeForJsxExpression(node, contextFlags) {
                const exprParent = node.parent;
                return isJsxAttributeLike(exprParent) ? getContextualType2(node, contextFlags) : isJsxElement(exprParent) ? getContextualTypeForChildJsxExpression(exprParent, node, contextFlags) : void 0;
            }