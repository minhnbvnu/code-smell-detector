function getMissingAccessibilitySuggestions(node) {
                function fix(accessibility, fixer) {
                    var _a;
                    if ((_a = node === null || node === void 0 ? void 0 : node.decorators) === null || _a === void 0 ? void 0 : _a.length) {
                        const lastDecorator = node.decorators[node.decorators.length - 1];
                        const nextToken = sourceCode.getTokenAfter(lastDecorator);
                        return fixer.insertTextBefore(nextToken, `${accessibility} `);
                    }
                    return fixer.insertTextBefore(node, `${accessibility} `);
                }
                return [
                    {
                        messageId: 'addExplicitAccessibility',
                        data: { type: 'public' },
                        fix: fixer => fix('public', fixer),
                    },
                    {
                        messageId: 'addExplicitAccessibility',
                        data: { type: 'private' },
                        fix: fixer => fix('private', fixer),
                    },
                    {
                        messageId: 'addExplicitAccessibility',
                        data: { type: 'protected' },
                        fix: fixer => fix('protected', fixer),
                    },
                ];
            }