function checkSpreadExpression(node, checkMode) {
                if (languageVersion < 2 /* ES2015 */) {
                    checkExternalEmitHelpers(node, compilerOptions.downlevelIteration ? 1536 /* SpreadIncludes */ : 1024 /* SpreadArray */);
                }
                const arrayOrIterableType = checkExpression(node.expression, checkMode);
                return checkIteratedTypeOrElementType(33 /* Spread */, arrayOrIterableType, undefinedType, node.expression);
            }