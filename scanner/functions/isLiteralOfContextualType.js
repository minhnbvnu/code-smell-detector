function isLiteralOfContextualType(candidateType, contextualType) {
                if (contextualType) {
                    if (contextualType.flags & 3145728 /* UnionOrIntersection */) {
                        const types = contextualType.types;
                        return some(types, (t) => isLiteralOfContextualType(candidateType, t));
                    }
                    if (contextualType.flags & 58982400 /* InstantiableNonPrimitive */) {
                        const constraint = getBaseConstraintOfType(contextualType) || unknownType;
                        return maybeTypeOfKind(constraint, 4 /* String */) && maybeTypeOfKind(candidateType, 128 /* StringLiteral */) || maybeTypeOfKind(constraint, 8 /* Number */) && maybeTypeOfKind(candidateType, 256 /* NumberLiteral */) || maybeTypeOfKind(constraint, 64 /* BigInt */) && maybeTypeOfKind(candidateType, 2048 /* BigIntLiteral */) || maybeTypeOfKind(constraint, 4096 /* ESSymbol */) && maybeTypeOfKind(candidateType, 8192 /* UniqueESSymbol */) || isLiteralOfContextualType(candidateType, constraint);
                    }
                    return !!(contextualType.flags & (128 /* StringLiteral */ | 4194304 /* Index */ | 134217728 /* TemplateLiteral */ | 268435456 /* StringMapping */) && maybeTypeOfKind(candidateType, 128 /* StringLiteral */) || contextualType.flags & 256 /* NumberLiteral */ && maybeTypeOfKind(candidateType, 256 /* NumberLiteral */) || contextualType.flags & 2048 /* BigIntLiteral */ && maybeTypeOfKind(candidateType, 2048 /* BigIntLiteral */) || contextualType.flags & 512 /* BooleanLiteral */ && maybeTypeOfKind(candidateType, 512 /* BooleanLiteral */) || contextualType.flags & 8192 /* UniqueESSymbol */ && maybeTypeOfKind(candidateType, 8192 /* UniqueESSymbol */));
                }
                return false;
            }