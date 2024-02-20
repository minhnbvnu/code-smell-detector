function bindCallExpression(node) {
                if (!file.commonJsModuleIndicator && isRequireCall(node, 
                /*checkArgumentIsStringLiteralLike*/
                false)) {
                    setCommonJsModuleIndicator(node);
                }
            }