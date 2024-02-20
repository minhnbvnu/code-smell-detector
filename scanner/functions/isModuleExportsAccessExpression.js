function isModuleExportsAccessExpression(node) {
            return (isPropertyAccessExpression(node) || isLiteralLikeElementAccess(node)) && isModuleIdentifier(node.expression) && getElementOrPropertyAccessName(node) === "exports";
        }