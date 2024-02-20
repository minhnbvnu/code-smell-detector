function checkVar(node) {
                const leftNode = (node.id.typeAnnotation) ? node.id.typeAnnotation : node.id;
                const rightNode = node.init;
                if (rightNode) {
                    const nonSpacedNode = getFirstNonSpacedToken(leftNode, rightNode, "=");
                    if (nonSpacedNode) {
                        report(node, nonSpacedNode);
                    }
                }
            }