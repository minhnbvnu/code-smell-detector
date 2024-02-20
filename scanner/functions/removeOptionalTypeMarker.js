function removeOptionalTypeMarker(type) {
                return strictNullChecks ? removeType(type, optionalType) : type;
            }