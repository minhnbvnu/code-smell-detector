function withJSDoc(node, hasJSDoc) {
                        return hasJSDoc ? addJSDocComment(node) : node;
                    }