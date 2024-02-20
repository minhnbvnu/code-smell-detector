function updateReadonlyPropertyInitializerStatementConstructor(changeTracker, file, constructor, fieldName, originalName) {
            if (!constructor.body)
                return;
            constructor.body.forEachChild(function recur(node) {
                if (isElementAccessExpression(node) && node.expression.kind === 108 /* ThisKeyword */ && isStringLiteral(node.argumentExpression) && node.argumentExpression.text === originalName && isWriteAccess(node)) {
                    changeTracker.replaceNode(file, node.argumentExpression, factory.createStringLiteral(fieldName));
                }
                if (isPropertyAccessExpression(node) && node.expression.kind === 108 /* ThisKeyword */ && node.name.text === originalName && isWriteAccess(node)) {
                    changeTracker.replaceNode(file, node.name, factory.createIdentifier(fieldName));
                }
                if (!isFunctionLike(node) && !isClassLike(node)) {
                    node.forEachChild(recur);
                }
            });
        }