function getUniqueLiteralFilledInstantiation(type) {
                return type.flags & (134348796 /* Primitive */ | 3 /* AnyOrUnknown */ | 131072 /* Never */) ? type : type.uniqueLiteralFilledInstantiation || (type.uniqueLiteralFilledInstantiation = instantiateType(type, uniqueLiteralMapper));
            }