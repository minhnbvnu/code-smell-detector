function ensureWasAssigned() {
                const scope = context.getScope();
                aliases.forEach(alias => {
                    checkWasAssigned(alias, scope);
                });
            }