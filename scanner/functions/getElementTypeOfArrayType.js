function getElementTypeOfArrayType(type) {
                return isArrayType(type) ? getTypeArguments(type)[0] : void 0;
            }