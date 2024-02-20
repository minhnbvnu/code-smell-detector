function checkForPropertyDefinitionAssignmentSpace(node) {
                var _a;
                const leftNode = node.optional && !node.typeAnnotation
                    ? sourceCode.getTokenAfter(node.key)
                    : (_a = node.typeAnnotation) !== null && _a !== void 0 ? _a : node.key;
                checkAndReportAssignmentSpace(leftNode, node.value);
            }