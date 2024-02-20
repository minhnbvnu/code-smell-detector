function createJSDocParameterTag(tagName, name, isBracketed, typeExpression, isNameFirst, comment) {
                const node = createBaseJSDocTagDeclaration(344 /* JSDocParameterTag */, tagName != null ? tagName : createIdentifier("param"), comment);
                node.typeExpression = typeExpression;
                node.name = name;
                node.isNameFirst = !!isNameFirst;
                node.isBracketed = isBracketed;
                return node;
            }