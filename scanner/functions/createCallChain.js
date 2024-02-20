function createCallChain(expression, questionDotToken, typeArguments, argumentsArray) {
                const node = createBaseCallExpression(parenthesizerRules().parenthesizeLeftSideOfAccess(expression, 
                /*optionalChain*/
                true), questionDotToken, asNodeArray(typeArguments), parenthesizerRules().parenthesizeExpressionsOfCommaDelimitedList(createNodeArray(argumentsArray)));
                node.flags |= 32 /* OptionalChain */;
                node.transformFlags |= 32 /* ContainsES2020 */;
                return node;
            }