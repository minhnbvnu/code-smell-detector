function createJSDocCallbackTag(tagName, typeExpression, fullName, comment) {
                const node = createBaseJSDocTagDeclaration(341 /* JSDocCallbackTag */, tagName != null ? tagName : createIdentifier("callback"), comment);
                node.typeExpression = typeExpression;
                node.fullName = fullName;
                node.name = getJSDocTypeAliasName(fullName);
                node.locals = void 0;
                node.nextContainer = void 0;
                return node;
            }