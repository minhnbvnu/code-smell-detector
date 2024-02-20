function getAssignedName(node) {
            if (!node.parent) {
                return void 0;
            }
            else if (isPropertyAssignment(node.parent) || isBindingElement(node.parent)) {
                return node.parent.name;
            }
            else if (isBinaryExpression(node.parent) && node === node.parent.right) {
                if (isIdentifier(node.parent.left)) {
                    return node.parent.left;
                }
                else if (isAccessExpression(node.parent.left)) {
                    return getElementOrPropertyAccessArgumentExpressionOrName(node.parent.left);
                }
            }
            else if (isVariableDeclaration(node.parent) && isIdentifier(node.parent.name)) {
                return node.parent.name;
            }
        }