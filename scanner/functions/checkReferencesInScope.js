function checkReferencesInScope(scope) {
                scope.references.filter(shouldCheck).forEach(reference => {
                    const variable = reference.resolved;
                    const definitionIdentifier = variable.defs[0].name;
                    if (reference.identifier.range[1] < definitionIdentifier.range[1] ||
                        isEvaluatedDuringInitialization(reference)) {
                        context.report({
                            node: reference.identifier,
                            messageId: "usedBeforeDefined",
                            data: reference.identifier
                        });
                    }
                });
                scope.childScopes.forEach(checkReferencesInScope);
            }