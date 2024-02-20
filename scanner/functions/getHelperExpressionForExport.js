function getHelperExpressionForExport(node, innerExpr) {
                if (!getESModuleInterop(compilerOptions) || getInternalEmitFlags(node) & 2 /* NeverApplyImportHelper */) {
                    return innerExpr;
                }
                if (getExportNeedsImportStarHelper(node)) {
                    return emitHelpers().createImportStarHelper(innerExpr);
                }
                return innerExpr;
            }