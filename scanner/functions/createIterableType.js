function createIterableType(iteratedType) {
                return createTypeFromGenericGlobalType(getGlobalIterableType(
                /*reportErrors*/
                true), [iteratedType]);
            }