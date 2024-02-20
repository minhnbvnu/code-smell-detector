function removeDefinitelyFalsyTypes(type) {
                return filterType(type, (t) => !!(getTypeFacts(t) & 4194304 /* Truthy */));
            }