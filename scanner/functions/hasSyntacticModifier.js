function hasSyntacticModifier(node, flags) {
            return !!getSelectedSyntacticModifierFlags(node, flags);
        }