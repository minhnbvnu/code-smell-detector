function getModeForUsageLocation(file, usage) {
            var _a2, _b;
            if (file.impliedNodeFormat === void 0)
                return void 0;
            if (isImportDeclaration(usage.parent) || isExportDeclaration(usage.parent)) {
                const isTypeOnly = isExclusivelyTypeOnlyImportOrExport(usage.parent);
                if (isTypeOnly) {
                    const override = getResolutionModeOverrideForClause(usage.parent.assertClause);
                    if (override) {
                        return override;
                    }
                }
            }
            if (usage.parent.parent && isImportTypeNode(usage.parent.parent)) {
                const override = getResolutionModeOverrideForClause((_a2 = usage.parent.parent.assertions) == null ? void 0 : _a2.assertClause);
                if (override) {
                    return override;
                }
            }
            if (file.impliedNodeFormat !== 99 /* ESNext */) {
                return isImportCall(walkUpParenthesizedExpressions(usage.parent)) ? 99 /* ESNext */ : 1 /* CommonJS */;
            }
            const exprParentParent = (_b = walkUpParenthesizedExpressions(usage.parent)) == null ? void 0 : _b.parent;
            return exprParentParent && isImportEqualsDeclaration(exprParentParent) ? 1 /* CommonJS */ : 99 /* ESNext */;
        }