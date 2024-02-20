function getPermissiveInstantiation(type) {
                return type.flags & (134348796 /* Primitive */ | 3 /* AnyOrUnknown */ | 131072 /* Never */) ? type : type.permissiveInstantiation || (type.permissiveInstantiation = instantiateType(type, permissiveMapper));
            }