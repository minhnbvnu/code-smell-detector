function createJSDocAugmentsTag(tagName, className, comment) {
                const node = createBaseJSDocTag(331 /* JSDocAugmentsTag */, tagName != null ? tagName : createIdentifier("augments"), comment);
                node.class = className;
                return node;
            }