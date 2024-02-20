function getFinalArrayType(evolvingArrayType) {
                return evolvingArrayType.finalArrayType || (evolvingArrayType.finalArrayType = createFinalArrayType(evolvingArrayType.elementType));
            }