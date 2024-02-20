function getAssignmentReducedTypeWorker(declaredType, assignedType) {
                const filteredType = filterType(declaredType, (t) => typeMaybeAssignableTo(assignedType, t));
                const reducedType = assignedType.flags & 512 /* BooleanLiteral */ && isFreshLiteralType(assignedType) ? mapType(filteredType, getFreshTypeOfLiteralType) : filteredType;
                return isTypeAssignableTo(assignedType, reducedType) ? reducedType : declaredType;
            }