function hasMatchingReference(source) {
                references.forEach(reference => {
                    if (reference.importName === source.value) {
                        context.report({
                            node: reference.comment,
                            messageId: 'tripleSlashReference',
                            data: {
                                module: reference.importName,
                            },
                        });
                    }
                });
            }