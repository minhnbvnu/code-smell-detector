function updateParamsList(node, params, modifierMask) {
                if (hasEffectiveModifier(node, 8 /* Private */)) {
                    return factory2.createNodeArray();
                }
                const newParams = map(params, (p) => ensureParameter(p, modifierMask));
                if (!newParams) {
                    return factory2.createNodeArray();
                }
                return factory2.createNodeArray(newParams, params.hasTrailingComma);
            }