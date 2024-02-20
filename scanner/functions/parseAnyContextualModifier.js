function parseAnyContextualModifier() {
                        return isModifierKind(token()) && tryParse(nextTokenCanFollowModifier);
                    }