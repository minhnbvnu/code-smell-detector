function getErrorNodeFromCommonJsIndicator(commonJsModuleIndicator) {
            return isBinaryExpression(commonJsModuleIndicator) ? commonJsModuleIndicator.left : commonJsModuleIndicator;
        }