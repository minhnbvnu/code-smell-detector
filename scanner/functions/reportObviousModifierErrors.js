function reportObviousModifierErrors(node) {
                if (!node.modifiers)
                    return false;
                const modifier = findFirstIllegalModifier(node);
                return modifier && grammarErrorOnFirstToken(modifier, Diagnostics.Modifiers_cannot_appear_here);
            }