function checkObjectLiteralMethod(node, checkMode) {
                checkGrammarMethod(node);
                if (node.name.kind === 164 /* ComputedPropertyName */) {
                    checkComputedPropertyName(node.name);
                }
                const uninstantiatedType = checkFunctionExpressionOrObjectLiteralMethod(node, checkMode);
                return instantiateTypeWithSingleGenericCallSignature(node, uninstantiatedType, checkMode);
            }