function isDiscriminantWithNeverType(prop) {
                return !(prop.flags & 16777216 /* Optional */) && (getCheckFlags(prop) & (192 /* Discriminant */ | 131072 /* HasNeverType */)) === 192 /* Discriminant */ && !!(getTypeOfSymbol(prop).flags & 131072 /* Never */);
            }