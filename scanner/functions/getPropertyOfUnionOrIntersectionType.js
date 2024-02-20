function getPropertyOfUnionOrIntersectionType(type, name, skipObjectFunctionPropertyAugment) {
                const property = getUnionOrIntersectionProperty(type, name, skipObjectFunctionPropertyAugment);
                return property && !(getCheckFlags(property) & 16 /* ReadPartial */) ? property : void 0;
            }