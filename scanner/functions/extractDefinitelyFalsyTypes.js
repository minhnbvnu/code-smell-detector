function extractDefinitelyFalsyTypes(type) {
                return mapType(type, getDefinitelyFalsyPartOfType);
            }