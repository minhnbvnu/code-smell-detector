function visitUnionOrIntersectionType(type) {
                    forEach(type.types, visitType);
                }