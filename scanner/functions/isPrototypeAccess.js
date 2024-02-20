function isPrototypeAccess(node) {
            return isBindableStaticAccessExpression(node) && getElementOrPropertyAccessName(node) === "prototype";
        }