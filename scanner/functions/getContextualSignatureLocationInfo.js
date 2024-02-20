function getContextualSignatureLocationInfo(startingToken, sourceFile, position, checker) {
            if (startingToken.kind !== 20 /* OpenParenToken */ && startingToken.kind !== 27 /* CommaToken */)
                return void 0;
            const { parent: parent2 } = startingToken;
            switch (parent2.kind) {
                case 214 /* ParenthesizedExpression */:
                case 171 /* MethodDeclaration */:
                case 215 /* FunctionExpression */:
                case 216 /* ArrowFunction */:
                    const info = getArgumentOrParameterListInfo(startingToken, position, sourceFile);
                    if (!info)
                        return void 0;
                    const { argumentIndex, argumentCount, argumentsSpan } = info;
                    const contextualType = isMethodDeclaration(parent2) ? checker.getContextualTypeForObjectLiteralElement(parent2) : checker.getContextualType(parent2);
                    return contextualType && { contextualType, argumentIndex, argumentCount, argumentsSpan };
                case 223 /* BinaryExpression */: {
                    const highestBinary = getHighestBinary(parent2);
                    const contextualType2 = checker.getContextualType(highestBinary);
                    const argumentIndex2 = startingToken.kind === 20 /* OpenParenToken */ ? 0 : countBinaryExpressionParameters(parent2) - 1;
                    const argumentCount2 = countBinaryExpressionParameters(highestBinary);
                    return contextualType2 && { contextualType: contextualType2, argumentIndex: argumentIndex2, argumentCount: argumentCount2, argumentsSpan: createTextSpanFromNode(parent2) };
                }
                default:
                    return void 0;
            }
        }