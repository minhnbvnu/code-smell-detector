function createSignatureInstantiation(signature, typeArguments) {
                return instantiateSignature(signature, createSignatureTypeMapper(signature, typeArguments), 
                /*eraseTypeParameters*/
                true);
            }