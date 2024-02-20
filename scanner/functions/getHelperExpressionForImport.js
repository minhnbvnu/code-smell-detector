function getHelperExpressionForImport(node, innerExpr) {
                if (!getESModuleInterop(compilerOptions) || getInternalEmitFlags(node) & 2 /* NeverApplyImportHelper */) {
                    return innerExpr;
                }
                if (getImportNeedsImportStarHelper(node)) {
                    return emitHelpers().createImportStarHelper(innerExpr);
                }
                if (getImportNeedsImportDefaultHelper(node)) {
                    return emitHelpers().createImportDefaultHelper(innerExpr);
                }
                return innerExpr;
            }