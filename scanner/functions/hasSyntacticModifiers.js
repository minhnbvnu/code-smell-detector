function hasSyntacticModifiers(node) {
            return getSyntacticModifierFlags(node) !== 0 /* None */;
        }