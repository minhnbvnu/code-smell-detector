function getEvolvingArrayType(elementType) {
                return evolvingArrayTypes[elementType.id] || (evolvingArrayTypes[elementType.id] = createEvolvingArrayType(elementType));
            }