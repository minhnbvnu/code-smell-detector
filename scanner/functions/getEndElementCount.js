function getEndElementCount(type, flags) {
                return type.elementFlags.length - findLastIndex(type.elementFlags, (f) => !(f & flags)) - 1;
            }