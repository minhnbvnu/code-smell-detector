function createErasedSignature(signature) {
                return instantiateSignature(signature, createTypeEraser(signature.typeParameters), 
                /*eraseTypeParameters*/
                true);
            }