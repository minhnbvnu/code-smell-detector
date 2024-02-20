function typeHasCallOrConstructSignatures(type) {
                return getSignaturesOfType(type, 0 /* Call */).length !== 0 || getSignaturesOfType(type, 1 /* Construct */).length !== 0;
            }