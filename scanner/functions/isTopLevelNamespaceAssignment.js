function isTopLevelNamespaceAssignment(propertyAccess) {
                return isBinaryExpression(propertyAccess.parent) ? getParentOfBinaryExpression(propertyAccess.parent).parent.kind === 308 /* SourceFile */ : propertyAccess.parent.parent.kind === 308 /* SourceFile */;
            }