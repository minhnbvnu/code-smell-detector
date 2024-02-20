function createJSDocTemplateTag(tagName, constraint, typeParameters, comment) {
                const node = createBaseJSDocTag(348 /* JSDocTemplateTag */, tagName != null ? tagName : createIdentifier("template"), comment);
                node.constraint = constraint;
                node.typeParameters = createNodeArray(typeParameters);
                return node;
            }