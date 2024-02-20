function checkJsxAttribute(node, checkMode) {
                return node.initializer ? checkExpressionForMutableLocation(node.initializer, checkMode) : trueType;
            }