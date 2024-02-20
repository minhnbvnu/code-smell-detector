function containerSeemsToBeEmptyDomElement(containingType) {
                return compilerOptions.lib && !compilerOptions.lib.includes("dom") && everyContainedType(containingType, (type) => type.symbol && /^(EventTarget|Node|((HTML[a-zA-Z]*)?Element))$/.test(unescapeLeadingUnderscores(type.symbol.escapedName))) && isEmptyObjectType(containingType);
            }