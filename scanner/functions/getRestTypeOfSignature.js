function getRestTypeOfSignature(signature) {
                return tryGetRestTypeOfSignature(signature) || anyType;
            }