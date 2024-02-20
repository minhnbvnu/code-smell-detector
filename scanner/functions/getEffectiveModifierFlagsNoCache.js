function getEffectiveModifierFlagsNoCache(node) {
            return getSyntacticModifierFlagsNoCache(node) | getJSDocModifierFlagsNoCache(node);
        }