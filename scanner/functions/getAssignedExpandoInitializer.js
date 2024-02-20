function getAssignedExpandoInitializer(node) {
            if (node && node.parent && isBinaryExpression(node.parent) && node.parent.operatorToken.kind === 63 /* EqualsToken */) {
                const isPrototypeAssignment = isPrototypeAccess(node.parent.left);
                return getExpandoInitializer(node.parent.right, isPrototypeAssignment) || getDefaultedExpandoInitializer(node.parent.left, node.parent.right, isPrototypeAssignment);
            }
            if (node && isCallExpression(node) && isBindableObjectDefinePropertyCall(node)) {
                const result = hasExpandoValueProperty(node.arguments[2], node.arguments[1].text === "prototype");
                if (result) {
                    return result;
                }
            }
        }