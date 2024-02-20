function checkBannedTypes(typeNode, name = stringifyNode(typeNode, context.getSourceCode())) {
                const bannedType = bannedTypes.get(name);
                if (bannedType === undefined || bannedType === false) {
                    return;
                }
                const customMessage = getCustomMessage(bannedType);
                const fixWith = bannedType && typeof bannedType === 'object' && bannedType.fixWith;
                context.report({
                    node: typeNode,
                    messageId: 'bannedTypeMessage',
                    data: {
                        name,
                        customMessage,
                    },
                    fix: fixWith
                        ? (fixer) => fixer.replaceText(typeNode, fixWith)
                        : null,
                });
            }