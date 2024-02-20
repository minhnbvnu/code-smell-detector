function checkForError(node) {
                const scope = context.getScope(), parameters = getParameters(scope), firstParameter = parameters[0];
                if (firstParameter && matchesConfiguredErrorName(firstParameter.name)) {
                    if (firstParameter.references.length === 0) {
                        context.report({ node, messageId: "expected" });
                    }
                }
            }