function parseContextualModifier(t) {
                        return token() === t && tryParse(nextTokenCanFollowModifier);
                    }