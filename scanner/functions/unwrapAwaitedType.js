function unwrapAwaitedType(type) {
                return type.flags & 1048576 /* Union */ ? mapType(type, unwrapAwaitedType) : isAwaitedTypeInstantiation(type) ? type.aliasTypeArguments[0] : type;
            }