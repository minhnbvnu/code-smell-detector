function isTemplateLiteralContextualType(type) {
                return !!(type.flags & (128 /* StringLiteral */ | 134217728 /* TemplateLiteral */) || type.flags & 58982400 /* InstantiableNonPrimitive */ && maybeTypeOfKind(getBaseConstraintOfType(type) || unknownType, 402653316 /* StringLike */));
            }