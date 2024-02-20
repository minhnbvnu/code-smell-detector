function getSuggestedSymbolForNonexistentProperty(name, containingType) {
                let props = getPropertiesOfType(containingType);
                if (typeof name !== "string") {
                    const parent2 = name.parent;
                    if (isPropertyAccessExpression(parent2)) {
                        props = filter(props, (prop) => isValidPropertyAccessForCompletions(parent2, containingType, prop));
                    }
                    name = idText(name);
                }
                return getSpellingSuggestionForName(name, props, 111551 /* Value */);
            }