function getTargetSymbol(s) {
                return getCheckFlags(s) & 1 /* Instantiated */ ? s.links.target : s;
            }