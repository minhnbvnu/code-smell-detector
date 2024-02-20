function getErasedSignature(signature) {
                return signature.typeParameters ? signature.erasedSignatureCache || (signature.erasedSignatureCache = createErasedSignature(signature)) : signature;
            }