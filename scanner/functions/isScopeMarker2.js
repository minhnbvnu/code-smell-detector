function isScopeMarker2(node) {
                return isExportAssignment(node) || isExportDeclaration(node);
            }