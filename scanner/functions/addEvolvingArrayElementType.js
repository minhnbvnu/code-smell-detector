function addEvolvingArrayElementType(evolvingArrayType, node) {
                const elementType = getRegularTypeOfObjectLiteral(getBaseTypeOfLiteralType(getContextFreeTypeOfExpression(node)));
                return isTypeSubsetOf(elementType, evolvingArrayType.elementType) ? evolvingArrayType : getEvolvingArrayType(getUnionType([evolvingArrayType.elementType, elementType]));
            }