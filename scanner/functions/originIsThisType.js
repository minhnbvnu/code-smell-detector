function originIsThisType(origin) {
            return !!(origin.kind & 1 /* ThisType */);
        }