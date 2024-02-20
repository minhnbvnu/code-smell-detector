function isThislessTypeParameter(node) {
                const constraint = getEffectiveConstraintOfTypeParameter(node);
                return !constraint || isThislessType(constraint);
            }