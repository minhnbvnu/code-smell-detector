function createBaseJSDocTag(kind, tagName, comment) {
                const node = createBaseNode(kind);
                node.tagName = tagName;
                node.comment = comment;
                return node;
            }