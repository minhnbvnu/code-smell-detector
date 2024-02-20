function hasExportedReferenceInDestructuringTarget(node) {
                if (isAssignmentExpression(node, 
                /*excludeCompoundAssignment*/
                true)) {
                    return hasExportedReferenceInDestructuringTarget(node.left);
                }
                else if (isSpreadElement(node)) {
                    return hasExportedReferenceInDestructuringTarget(node.expression);
                }
                else if (isObjectLiteralExpression(node)) {
                    return some(node.properties, hasExportedReferenceInDestructuringTarget);
                }
                else if (isArrayLiteralExpression(node)) {
                    return some(node.elements, hasExportedReferenceInDestructuringTarget);
                }
                else if (isShorthandPropertyAssignment(node)) {
                    return hasExportedReferenceInDestructuringTarget(node.name);
                }
                else if (isPropertyAssignment(node)) {
                    return hasExportedReferenceInDestructuringTarget(node.initializer);
                }
                else if (isIdentifier(node)) {
                    const container = resolver.getReferencedExportContainer(node);
                    return container !== void 0 && container.kind === 308 /* SourceFile */;
                }
                else {
                    return false;
                }
            }