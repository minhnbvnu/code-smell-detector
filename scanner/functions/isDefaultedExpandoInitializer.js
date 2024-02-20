function isDefaultedExpandoInitializer(node) {
            const name = isVariableDeclaration(node.parent) ? node.parent.name : isBinaryExpression(node.parent) && node.parent.operatorToken.kind === 63 /* EqualsToken */ ? node.parent.left : void 0;
            return name && getExpandoInitializer(node.right, isPrototypeAccess(name)) && isEntityNameExpression(name) && isSameEntityName(name, node.left);
        }