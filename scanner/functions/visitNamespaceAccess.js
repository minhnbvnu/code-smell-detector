function visitNamespaceAccess(node, qualifier, name) {
                // Only look for nested qualifier errors if we didn't already fail on the outer qualifier.
                if (!currentFailedNamespaceExpression &&
                    qualifierIsUnnecessary(qualifier, name)) {
                    currentFailedNamespaceExpression = node;
                    context.report({
                        node: qualifier,
                        messageId: 'unnecessaryQualifier',
                        data: {
                            name: sourceCode.getText(name),
                        },
                        fix(fixer) {
                            return fixer.removeRange([qualifier.range[0], name.range[0]]);
                        },
                    });
                }
            }