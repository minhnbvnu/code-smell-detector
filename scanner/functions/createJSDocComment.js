function createJSDocComment(comment, tags) {
                const node = createBaseNode(323 /* JSDoc */);
                node.comment = comment;
                node.tags = asNodeArray(tags);
                return node;
            }