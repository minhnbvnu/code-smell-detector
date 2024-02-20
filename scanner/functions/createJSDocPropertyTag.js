function createJSDocPropertyTag(tagName, name, isBracketed, typeExpression, isNameFirst, comment) {
                const node = createBaseJSDocTagDeclaration(351 /* JSDocPropertyTag */, tagName != null ? tagName : createIdentifier("prop"), comment);
                node.typeExpression = typeExpression;
                node.name = name;
                node.isNameFirst = !!isNameFirst;
                node.isBracketed = isBracketed;
                return node;
            }