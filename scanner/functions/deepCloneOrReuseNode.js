function deepCloneOrReuseNode(node) {
                            if (!nodeIsSynthesized(node) && getParseTreeNode(node) === node) {
                                return node;
                            }
                            return setTextRange(factory.cloneNode(visitEachChild(node, deepCloneOrReuseNode, nullTransformationContext, deepCloneOrReuseNodes)), node);
                        }