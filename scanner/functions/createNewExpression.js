function createNewExpression(expression, typeArguments, argumentsArray) {
                const node = createBaseDeclaration(211 /* NewExpression */);
                node.expression = parenthesizerRules().parenthesizeExpressionOfNew(expression);
                node.typeArguments = asNodeArray(typeArguments);
                node.arguments = argumentsArray ? parenthesizerRules().parenthesizeExpressionsOfCommaDelimitedList(argumentsArray) : void 0;
                node.transformFlags |= propagateChildFlags(node.expression) | propagateChildrenFlags(node.typeArguments) | propagateChildrenFlags(node.arguments) | 32 /* ContainsES2020 */;
                if (node.typeArguments) {
                    node.transformFlags |= 1 /* ContainsTypeScript */;
                }
                return node;
            }