function originIsNullableMember(origin) {
            return !!(origin.kind & 16 /* Nullable */);
        }