function hasSelfReferenceInTDZ(declarator) {
                if (!declarator.init) {
                    return false;
                }
                const variables = context.getDeclaredVariables(declarator);
                return variables.some(hasReferenceInTDZ(declarator.init));
            }