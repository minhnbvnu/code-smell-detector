function getReturnTypeOfTypeTag(node) {
                const signature = getSignatureOfTypeTag(node);
                return signature && getReturnTypeOfSignature(signature);
            }