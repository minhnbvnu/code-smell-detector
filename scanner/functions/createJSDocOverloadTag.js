function createJSDocOverloadTag(tagName, typeExpression, comment) {
                const node = createBaseJSDocTag(342 /* JSDocOverloadTag */, tagName != null ? tagName : createIdentifier("overload"), comment);
                node.typeExpression = typeExpression;
                return node;
            }