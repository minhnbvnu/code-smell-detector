function createJSDocImplementsTag(tagName, className, comment) {
                const node = createBaseJSDocTag(332 /* JSDocImplementsTag */, tagName != null ? tagName : createIdentifier("implements"), comment);
                node.class = className;
                return node;
            }