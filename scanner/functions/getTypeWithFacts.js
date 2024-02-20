function getTypeWithFacts(type, include) {
                return filterType(type, (t) => (getTypeFacts(t) & include) !== 0);
            }