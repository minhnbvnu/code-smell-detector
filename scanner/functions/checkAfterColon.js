function checkAfterColon(node, expectedWhitespaceAfterColon, mode) {
                const { typeAnnotation } = node;
                const colon = typeAnnotation.loc.start.column;
                const typeStart = typeAnnotation.typeAnnotation.loc.start.column;
                const difference = typeStart - colon - 1 - expectedWhitespaceAfterColon;
                if (mode === 'strict' ? difference : difference < 0) {
                    context.report({
                        node,
                        messageId: difference > 0 ? 'extraValue' : 'missingValue',
                        fix: fixer => {
                            if (difference > 0) {
                                return fixer.removeRange([
                                    typeAnnotation.typeAnnotation.range[0] - difference,
                                    typeAnnotation.typeAnnotation.range[0],
                                ]);
                            }
                            else {
                                return fixer.insertTextBefore(typeAnnotation.typeAnnotation, ' '.repeat(-difference));
                            }
                        },
                        data: {
                            computed: '',
                            key: getKeyText(node),
                        },
                    });
                }
            }