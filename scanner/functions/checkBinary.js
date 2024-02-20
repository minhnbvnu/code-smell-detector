function checkBinary(node) {
                const leftNode = (node.left.typeAnnotation) ? node.left.typeAnnotation : node.left;
                const rightNode = node.right;
                // search for = in AssignmentPattern nodes
                const operator = node.operator || "=";
                const nonSpacedNode = getFirstNonSpacedToken(leftNode, rightNode, operator);
                if (nonSpacedNode) {
                    if (!(int32Hint && sourceCode.getText(node).endsWith("|0"))) {
                        report(node, nonSpacedNode);
                    }
                }
            }