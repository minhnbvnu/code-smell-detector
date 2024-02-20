function containsTypeWithFlag(type, flag) {
        for (const t of unionTypeParts(type))
            if (util_1.isTypeFlagSet(t, flag))
                return true;
        return false;
    }