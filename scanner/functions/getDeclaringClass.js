function getDeclaringClass(prop) {
                return prop.parent && prop.parent.flags & 32 /* Class */ ? getDeclaredTypeOfSymbol(getParentOfSymbol(prop)) : void 0;
            }