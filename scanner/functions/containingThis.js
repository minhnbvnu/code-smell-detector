function containingThis(node) {
            let containsThis = false;
            node.forEachChild(function checkThis(child) {
                if (isThis(child)) {
                    containsThis = true;
                    return;
                }
                if (!isClassLike(child) && !isFunctionDeclaration(child) && !isFunctionExpression(child)) {
                    forEachChild(child, checkThis);
                }
            });
            return containsThis;
        }