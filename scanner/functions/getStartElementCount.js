function getStartElementCount(type, flags) {
                const index = findIndex(type.elementFlags, (f) => !(f & flags));
                return index >= 0 ? index : type.elementFlags.length;
            }