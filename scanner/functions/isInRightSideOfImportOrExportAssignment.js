function isInRightSideOfImportOrExportAssignment(node) {
                return getLeftSideOfImportEqualsOrExportAssignment(node) !== void 0;
            }