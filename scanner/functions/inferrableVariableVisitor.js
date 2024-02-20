function inferrableVariableVisitor(node) {
                if (!node.id) {
                    return;
                }
                reportInferrableType(node, node.id.typeAnnotation, node.init);
            }