function createCallExpression(expression, typeArguments, argumentsArray) {
                const node = createBaseCallExpression(parenthesizerRules().parenthesizeLeftSideOfAccess(expression, 
                /*optionalChain*/
                false), 
                /*questionDotToken*/
                void 0, asNodeArray(typeArguments), parenthesizerRules().parenthesizeExpressionsOfCommaDelimitedList(createNodeArray(argumentsArray)));
                if (isImportKeyword(node.expression)) {
                    node.transformFlags |= 8388608 /* ContainsDynamicImport */;
                }
                return node;
            }