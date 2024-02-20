function getGlobalBigIntType() {
                return deferredGlobalBigIntType || (deferredGlobalBigIntType = getGlobalType("BigInt", 
                /*arity*/
                0, 
                /*reportErrors*/
                false)) || emptyObjectType;
            }