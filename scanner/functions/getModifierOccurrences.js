function getModifierOccurrences(modifier, declaration) {
                        return mapDefined(getNodesToSearchForModifier(declaration, modifierToFlag(modifier)), (node) => findModifier(node, modifier));
                    }