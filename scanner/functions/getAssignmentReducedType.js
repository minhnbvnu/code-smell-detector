function getAssignmentReducedType(declaredType, assignedType) {
                var _a2;
                if (declaredType === assignedType) {
                    return declaredType;
                }
                if (assignedType.flags & 131072 /* Never */) {
                    return assignedType;
                }
                const key = `A${getTypeId(declaredType)},${getTypeId(assignedType)}`;
                return (_a2 = getCachedType(key)) != null ? _a2 : setCachedType(key, getAssignmentReducedTypeWorker(declaredType, assignedType));
            }