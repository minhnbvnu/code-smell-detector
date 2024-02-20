function addOptionalTypeMarker(type) {
                return strictNullChecks ? getUnionType([type, optionalType]) : type;
            }