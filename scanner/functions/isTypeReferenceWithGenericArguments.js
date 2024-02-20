function isTypeReferenceWithGenericArguments(type) {
                return isNonDeferredTypeReference(type) && some(getTypeArguments(type), (t) => !!(t.flags & 262144 /* TypeParameter */) || isTypeReferenceWithGenericArguments(t));
            }