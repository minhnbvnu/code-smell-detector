function addFailures(failures) {
                for (const failure of failures) {
                    const { unify, only2 } = failure;
                    switch (unify.kind) {
                        case 'single-parameter-difference': {
                            const { p0, p1 } = unify;
                            const lineOfOtherOverload = only2 ? undefined : p0.loc.start.line;
                            const typeAnnotation0 = isTSParameterProperty(p0)
                                ? p0.parameter.typeAnnotation
                                : p0.typeAnnotation;
                            const typeAnnotation1 = isTSParameterProperty(p1)
                                ? p1.parameter.typeAnnotation
                                : p1.typeAnnotation;
                            context.report({
                                loc: p1.loc,
                                messageId: 'singleParameterDifference',
                                data: {
                                    failureStringStart: failureStringStart(lineOfOtherOverload),
                                    type1: sourceCode.getText(typeAnnotation0 === null || typeAnnotation0 === void 0 ? void 0 : typeAnnotation0.typeAnnotation),
                                    type2: sourceCode.getText(typeAnnotation1 === null || typeAnnotation1 === void 0 ? void 0 : typeAnnotation1.typeAnnotation),
                                },
                                node: p1,
                            });
                            break;
                        }
                        case 'extra-parameter': {
                            const { extraParameter, otherSignature } = unify;
                            const lineOfOtherOverload = only2
                                ? undefined
                                : otherSignature.loc.start.line;
                            context.report({
                                loc: extraParameter.loc,
                                messageId: extraParameter.type === utils_1.AST_NODE_TYPES.RestElement
                                    ? 'omittingRestParameter'
                                    : 'omittingSingleParameter',
                                data: {
                                    failureStringStart: failureStringStart(lineOfOtherOverload),
                                },
                                node: extraParameter,
                            });
                        }
                    }
                }
            }