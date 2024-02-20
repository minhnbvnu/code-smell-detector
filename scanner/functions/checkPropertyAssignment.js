function checkPropertyAssignment(node, checkMode) {
                if (node.name.kind === 164 /* ComputedPropertyName */) {
                    checkComputedPropertyName(node.name);
                }
                return checkExpressionForMutableLocation(node.initializer, checkMode);
            }