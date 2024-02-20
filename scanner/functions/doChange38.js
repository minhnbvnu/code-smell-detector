function doChange38(sourceFile, changes, declaration, typeNode) {
            const closeParen = findChildOfKind(declaration, 21 /* CloseParenToken */, sourceFile);
            const needParens = isArrowFunction(declaration) && closeParen === void 0;
            const endNode2 = needParens ? first(declaration.parameters) : closeParen;
            if (endNode2) {
                if (needParens) {
                    changes.insertNodeBefore(sourceFile, endNode2, factory.createToken(20 /* OpenParenToken */));
                    changes.insertNodeAfter(sourceFile, endNode2, factory.createToken(21 /* CloseParenToken */));
                }
                changes.insertNodeAt(sourceFile, endNode2.end, typeNode, { prefix: ": " });
            }
        }