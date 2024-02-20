function originIsSymbolMember(origin) {
            return !!(origin.kind & 2 /* SymbolMember */);
        }