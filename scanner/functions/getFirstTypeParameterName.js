function getFirstTypeParameterName(type) {
            var _a2;
            if (type.flags & (1048576 /* Union */ | 2097152 /* Intersection */)) {
                for (const subType of type.types) {
                    const subTypeName = getFirstTypeParameterName(subType);
                    if (subTypeName) {
                        return subTypeName;
                    }
                }
            }
            return type.flags & 262144 /* TypeParameter */ ? (_a2 = type.getSymbol()) == null ? void 0 : _a2.getName() : void 0;
        }