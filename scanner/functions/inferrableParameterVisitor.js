function inferrableParameterVisitor(node) {
                if (ignoreParameters || !node.params) {
                    return;
                }
                node.params.filter(param => param.type === utils_1.AST_NODE_TYPES.AssignmentPattern &&
                    param.left &&
                    param.right).forEach(param => {
                    reportInferrableType(param, param.left.typeAnnotation, param.right);
                });
            }