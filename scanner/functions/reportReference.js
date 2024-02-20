function reportReference(reference) {
                const name = reference.identifier.name, customMessage = restrictedGlobalMessages[name], messageId = customMessage
                    ? "customMessage"
                    : "defaultMessage";
                context.report({
                    node: reference.identifier,
                    messageId,
                    data: {
                        name,
                        customMessage
                    }
                });
            }