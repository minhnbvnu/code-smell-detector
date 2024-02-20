function existingTypeNodeIsNotReferenceOrIsReferenceWithCompatibleTypeArgumentCount(existing, type) {
                    return !(getObjectFlags(type) & 4 /* Reference */) || !isTypeReferenceNode(existing) || length(existing.typeArguments) >= getMinTypeArgumentCount(type.target.typeParameters);
                }