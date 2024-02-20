function checkForTypeAnnotationSpace(typeAnnotation) {
                const types = typeAnnotation.types;
                types.forEach(type => {
                    const skipFunctionParenthesis = type.type === utils_1.TSESTree.AST_NODE_TYPES.TSFunctionType
                        ? util.isNotOpeningParenToken
                        : 0;
                    const operator = sourceCode.getTokenBefore(type, skipFunctionParenthesis);
                    if (operator != null && UNIONS.includes(operator.value)) {
                        const prev = sourceCode.getTokenBefore(operator);
                        const next = sourceCode.getTokenAfter(operator);
                        if (!sourceCode.isSpaceBetween(prev, operator) ||
                            !sourceCode.isSpaceBetween(operator, next)) {
                            report(operator);
                        }
                    }
                });
            }