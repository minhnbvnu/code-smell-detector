function isEmptyArrayLiteralType(type) {
                const elementType = getElementTypeOfArrayType(type);
                return !!elementType && isEmptyLiteralType(elementType);
            }