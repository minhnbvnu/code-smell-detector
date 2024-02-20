function getSubstitutionType(baseType, constraint) {
                if (constraint.flags & 3 /* AnyOrUnknown */ || constraint === baseType || baseType.flags & 1 /* Any */) {
                    return baseType;
                }
                const id = `${getTypeId(baseType)}>${getTypeId(constraint)}`;
                const cached = substitutionTypes.get(id);
                if (cached) {
                    return cached;
                }
                const result = createType(33554432 /* Substitution */);
                result.baseType = baseType;
                result.constraint = constraint;
                substitutionTypes.set(id, result);
                return result;
            }