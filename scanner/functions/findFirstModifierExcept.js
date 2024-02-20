function findFirstModifierExcept(node, allowedModifier) {
                const modifier = find(node.modifiers, isModifier);
                return modifier && modifier.kind !== allowedModifier ? modifier : void 0;
            }