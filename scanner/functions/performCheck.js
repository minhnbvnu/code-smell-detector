function performCheck(leftNode, rightNode, reportNode) {
                if (rightNode.type !== "MemberExpression" ||
                    rightNode.object.type === "Super" ||
                    rightNode.property.type === "PrivateIdentifier") {
                    return;
                }
                if (isArrayIndexAccess(rightNode)) {
                    if (shouldCheck(reportNode.type, "array")) {
                        report(reportNode, "array", null);
                    }
                    return;
                }
                const fix = shouldFix(reportNode)
                    ? fixer => fixIntoObjectDestructuring(fixer, reportNode)
                    : null;
                if (shouldCheck(reportNode.type, "object") && enforceForRenamedProperties) {
                    report(reportNode, "object", fix);
                    return;
                }
                if (shouldCheck(reportNode.type, "object")) {
                    const property = rightNode.property;
                    if ((property.type === "Literal" && leftNode.name === property.value) ||
                        (property.type === "Identifier" && leftNode.name === property.name && !rightNode.computed)) {
                        report(reportNode, "object", fix);
                    }
                }
            }