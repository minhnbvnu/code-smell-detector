function modifierElidingVisitor(node) {
                return isModifier(node) ? void 0 : visitor(node);
            }