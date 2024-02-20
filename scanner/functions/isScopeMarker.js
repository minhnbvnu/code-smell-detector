function isScopeMarker(node) {
            return isExportAssignment(node) || isExportDeclaration(node);
        }