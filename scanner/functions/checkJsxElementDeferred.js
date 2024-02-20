function checkJsxElementDeferred(node) {
                checkJsxOpeningLikeElementOrOpeningFragment(node.openingElement);
                if (isJsxIntrinsicIdentifier(node.closingElement.tagName)) {
                    getIntrinsicTagSymbol(node.closingElement);
                }
                else {
                    checkExpression(node.closingElement.tagName);
                }
                checkJsxChildren(node);
            }