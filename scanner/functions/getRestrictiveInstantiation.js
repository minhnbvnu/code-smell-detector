function getRestrictiveInstantiation(type) {
                if (type.flags & (134348796 /* Primitive */ | 3 /* AnyOrUnknown */ | 131072 /* Never */)) {
                    return type;
                }
                if (type.restrictiveInstantiation) {
                    return type.restrictiveInstantiation;
                }
                type.restrictiveInstantiation = instantiateType(type, restrictiveMapper);
                type.restrictiveInstantiation.restrictiveInstantiation = type.restrictiveInstantiation;
                return type.restrictiveInstantiation;
            }