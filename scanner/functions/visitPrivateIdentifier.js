function visitPrivateIdentifier(node) {
                if (!shouldTransformPrivateElementsOrClassStaticBlocks) {
                    return node;
                }
                if (isStatement(node.parent)) {
                    return node;
                }
                return setOriginalNode(factory2.createIdentifier(""), node);
            }