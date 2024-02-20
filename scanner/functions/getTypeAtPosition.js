function getTypeAtPosition(signature, pos) {
                return tryGetTypeAtPosition(signature, pos) || anyType;
            }