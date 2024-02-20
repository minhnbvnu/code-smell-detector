function findMatchingDiscriminantType(source, target, isRelatedTo, skipPartial) {
                if (target.flags & 1048576 /* Union */ && source.flags & (2097152 /* Intersection */ | 524288 /* Object */)) {
                    const match = getMatchingUnionConstituentForType(target, source);
                    if (match) {
                        return match;
                    }
                    const sourceProperties = getPropertiesOfType(source);
                    if (sourceProperties) {
                        const sourcePropertiesFiltered = findDiscriminantProperties(sourceProperties, target);
                        if (sourcePropertiesFiltered) {
                            return discriminateTypeByDiscriminableItems(target, map(sourcePropertiesFiltered, (p) => [() => getTypeOfSymbol(p), p.escapedName]), isRelatedTo, 
                            /*defaultValue*/
                            void 0, skipPartial);
                        }
                    }
                }
                return void 0;
            }