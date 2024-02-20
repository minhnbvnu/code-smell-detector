function getEffectiveFirstArgumentForJsxSignature(signature, node) {
                return getJsxReferenceKind(node) !== 0 /* Component */ ? getJsxPropsTypeFromCallSignature(signature, node) : getJsxPropsTypeFromClassType(signature, node);
            }