function createJSDocSeeTag(tagName, name, comment) {
                const node = createBaseJSDocTag(350 /* JSDocSeeTag */, tagName != null ? tagName : createIdentifier("see"), comment);
                node.name = name;
                return node;
            }