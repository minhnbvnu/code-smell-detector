function checkForArguments() {
                const argumentsVar = getVariableOfArguments(context.getScope());
                if (argumentsVar) {
                    argumentsVar
                        .references
                        .filter(isNotNormalMemberAccess)
                        .forEach(report);
                }
            }