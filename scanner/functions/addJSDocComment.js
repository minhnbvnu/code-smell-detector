function addJSDocComment(node) {
                        Debug.assert(!node.jsDoc);
                        const jsDoc = mapDefined(getJSDocCommentRanges(node, sourceText), (comment) => JSDocParser.parseJSDocComment(node, comment.pos, comment.end - comment.pos));
                        if (jsDoc.length)
                            node.jsDoc = jsDoc;
                        if (hasDeprecatedTag) {
                            hasDeprecatedTag = false;
                            node.flags |= 268435456 /* Deprecated */;
                        }
                        return node;
                    }