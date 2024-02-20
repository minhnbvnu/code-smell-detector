function checkBeforeColon(node, expectedWhitespaceBeforeColon, mode) {
                const { typeAnnotation } = node;
                const colon = typeAnnotation.loc.start.column;
                const keyEnd = getKeyLocEnd(node);
                const difference = colon - keyEnd.column - expectedWhitespaceBeforeColon;
                if (mode === 'strict' ? difference : difference < 0) {
                    context.report({
                        node,
                        messageId: difference > 0 ? 'extraKey' : 'missingKey',
                        fix: fixer => {
                            if (difference > 0) {
                                return fixer.removeRange([
                                    typeAnnotation.range[0] - difference,
                                    typeAnnotation.range[0],
                                ]);
                            }
                            else {
                                return fixer.insertTextBefore(typeAnnotation, ' '.repeat(-difference));
                            }
                        },
                        data: {
                            computed: '',
                            key: getKeyText(node),
                        },
                    });
                }
            }