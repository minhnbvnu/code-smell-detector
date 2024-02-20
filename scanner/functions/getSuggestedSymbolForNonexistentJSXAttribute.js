function getSuggestedSymbolForNonexistentJSXAttribute(name, containingType) {
                const strName = isString(name) ? name : idText(name);
                const properties = getPropertiesOfType(containingType);
                const jsxSpecific = strName === "for" ? find(properties, (x) => symbolName(x) === "htmlFor") : strName === "class" ? find(properties, (x) => symbolName(x) === "className") : void 0;
                return jsxSpecific != null ? jsxSpecific : getSpellingSuggestionForName(strName, properties, 111551 /* Value */);
            }