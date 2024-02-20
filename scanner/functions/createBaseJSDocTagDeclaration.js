function createBaseJSDocTagDeclaration(kind, tagName, comment) {
                const node = createBaseDeclaration(kind);
                node.tagName = tagName;
                node.comment = comment;
                return node;
            }