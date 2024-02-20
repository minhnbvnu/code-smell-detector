function addTypesToIntersection(typeSet, includes, types) {
                for (const type of types) {
                    includes = addTypeToIntersection(typeSet, includes, getRegularTypeOfLiteralType(type));
                }
                return includes;
            }