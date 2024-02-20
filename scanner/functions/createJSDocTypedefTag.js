function createJSDocTypedefTag(tagName, typeExpression, fullName, comment) {
                const node = createBaseJSDocTagDeclaration(349 /* JSDocTypedefTag */, tagName != null ? tagName : createIdentifier("typedef"), comment);
                node.typeExpression = typeExpression;
                node.fullName = fullName;
                node.name = getJSDocTypeAliasName(fullName);
                node.locals = void 0;
                node.nextContainer = void 0;
                return node;
            }