function getEffectiveBaseTypeNode(node) {
            const baseType = getClassExtendsHeritageElement(node);
            if (baseType && isInJSFile(node)) {
                const tag = getJSDocAugmentsTag(node);
                if (tag) {
                    return tag.class;
                }
            }
            return baseType;
        }