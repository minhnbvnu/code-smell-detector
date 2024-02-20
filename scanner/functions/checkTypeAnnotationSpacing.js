function checkTypeAnnotationSpacing(typeAnnotation) {
                const nextToken = typeAnnotation;
                const punctuatorTokenEnd = sourceCode.getTokenBefore(nextToken);
                let punctuatorTokenStart = punctuatorTokenEnd;
                let previousToken = sourceCode.getTokenBefore(punctuatorTokenEnd);
                let type = punctuatorTokenEnd.value;
                if (!punctuators.includes(type)) {
                    return;
                }
                const { before, after } = getRules(ruleSet, typeAnnotation);
                if (type === ':' && previousToken.value === '?') {
                    if (
                    // eslint-disable-next-line deprecation/deprecation -- TODO - switch once our min ESLint version is 6.7.0
                    sourceCode.isSpaceBetweenTokens(previousToken, punctuatorTokenStart)) {
                        context.report({
                            node: punctuatorTokenStart,
                            messageId: 'unexpectedSpaceBetween',
                            data: {
                                type,
                                previousToken: previousToken.value,
                            },
                            fix(fixer) {
                                return fixer.removeRange([
                                    previousToken.range[1],
                                    punctuatorTokenStart.range[0],
                                ]);
                            },
                        });
                    }
                    // shift the start to the ?
                    type = '?:';
                    punctuatorTokenStart = previousToken;
                    previousToken = sourceCode.getTokenBefore(previousToken);
                    // handle the +/- modifiers for optional modification operators
                    if (previousToken.value === '+' || previousToken.value === '-') {
                        type = `${previousToken.value}?:`;
                        punctuatorTokenStart = previousToken;
                        previousToken = sourceCode.getTokenBefore(previousToken);
                    }
                }
                const previousDelta = punctuatorTokenStart.range[0] - previousToken.range[1];
                const nextDelta = nextToken.range[0] - punctuatorTokenEnd.range[1];
                if (after && nextDelta === 0) {
                    context.report({
                        node: punctuatorTokenEnd,
                        messageId: 'expectedSpaceAfter',
                        data: {
                            type,
                        },
                        fix(fixer) {
                            return fixer.insertTextAfter(punctuatorTokenEnd, ' ');
                        },
                    });
                }
                else if (!after && nextDelta > 0) {
                    context.report({
                        node: punctuatorTokenEnd,
                        messageId: 'unexpectedSpaceAfter',
                        data: {
                            type,
                        },
                        fix(fixer) {
                            return fixer.removeRange([
                                punctuatorTokenEnd.range[1],
                                nextToken.range[0],
                            ]);
                        },
                    });
                }
                if (before && previousDelta === 0) {
                    context.report({
                        node: punctuatorTokenStart,
                        messageId: 'expectedSpaceBefore',
                        data: {
                            type,
                        },
                        fix(fixer) {
                            return fixer.insertTextAfter(previousToken, ' ');
                        },
                    });
                }
                else if (!before && previousDelta > 0) {
                    context.report({
                        node: punctuatorTokenStart,
                        messageId: 'unexpectedSpaceBefore',
                        data: {
                            type,
                        },
                        fix(fixer) {
                            return fixer.removeRange([
                                previousToken.range[1],
                                punctuatorTokenStart.range[0],
                            ]);
                        },
                    });
                }
            }