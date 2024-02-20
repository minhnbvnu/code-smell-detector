function TSEnumDeclaration(node) {
                const { members } = node;
                members.forEach((member, index) => {
                    if (member.initializer == null) {
                        const name = sourceCode.getText(member);
                        context.report({
                            node: member,
                            messageId: 'defineInitializer',
                            data: {
                                name,
                            },
                            suggest: [
                                {
                                    messageId: 'defineInitializerSuggestion',
                                    data: { name, suggested: index },
                                    fix: (fixer) => {
                                        return fixer.replaceText(member, `${name} = ${index}`);
                                    },
                                },
                                {
                                    messageId: 'defineInitializerSuggestion',
                                    data: { name, suggested: index + 1 },
                                    fix: (fixer) => {
                                        return fixer.replaceText(member, `${name} = ${index + 1}`);
                                    },
                                },
                                {
                                    messageId: 'defineInitializerSuggestion',
                                    data: { name, suggested: `'${name}'` },
                                    fix: (fixer) => {
                                        return fixer.replaceText(member, `${name} = '${name}'`);
                                    },
                                },
                            ],
                        });
                    }
                });
            }