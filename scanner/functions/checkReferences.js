function checkReferences(variable) {
                // Gets references that exist in loop conditions.
                const conditions = variable
                    .references
                    .map(toLoopCondition)
                    .filter(Boolean);
                if (conditions.length === 0) {
                    return;
                }
                // Registers the conditions to belonging groups.
                registerConditionsToGroup(conditions);
                // Check the conditions are modified.
                const modifiers = variable.references.filter(isWriteReference);
                if (modifiers.length > 0) {
                    updateModifiedFlag(conditions, modifiers);
                }
                /*
                 * Reports the conditions which are not belonging to groups.
                 * Others will be reported after all variables are done.
                 */
                conditions
                    .filter(isUnmodifiedAndNotBelongToGroup)
                    .forEach(report);
            }