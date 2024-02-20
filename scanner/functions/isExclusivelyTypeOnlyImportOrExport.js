function isExclusivelyTypeOnlyImportOrExport(decl) {
            var _a2;
            if (isExportDeclaration(decl)) {
                return decl.isTypeOnly;
            }
            if ((_a2 = decl.importClause) == null ? void 0 : _a2.isTypeOnly) {
                return true;
            }
            return false;
        }