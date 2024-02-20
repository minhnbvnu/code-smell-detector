function collectUsages(node, valueUsage = 1 /* Read */) {
                if (inGenericContext) {
                    const type = checker.getTypeAtLocation(node);
                    recordTypeParameterUsages(type);
                }
                if (isDeclaration(node) && node.symbol) {
                    visibleDeclarationsInExtractedRange.push(node);
                }
                if (isAssignmentExpression(node)) {
                    collectUsages(node.left, 2 /* Write */);
                    collectUsages(node.right);
                }
                else if (isUnaryExpressionWithWrite(node)) {
                    collectUsages(node.operand, 2 /* Write */);
                }
                else if (isPropertyAccessExpression(node) || isElementAccessExpression(node)) {
                    forEachChild(node, collectUsages);
                }
                else if (isIdentifier(node)) {
                    if (!node.parent) {
                        return;
                    }
                    if (isQualifiedName(node.parent) && node !== node.parent.left) {
                        return;
                    }
                    if (isPropertyAccessExpression(node.parent) && node !== node.parent.expression) {
                        return;
                    }
                    recordUsage(node, valueUsage, 
                    /*isTypeNode*/
                    isPartOfTypeNode(node));
                }
                else {
                    forEachChild(node, collectUsages);
                }
            }