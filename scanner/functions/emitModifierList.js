function emitModifierList(node, modifiers) {
                emitList(node, modifiers, 2359808 /* Modifiers */);
                const lastModifier = lastOrUndefined(modifiers);
                return lastModifier && !positionIsSynthesized(lastModifier.end) ? lastModifier.end : node.pos;
            }