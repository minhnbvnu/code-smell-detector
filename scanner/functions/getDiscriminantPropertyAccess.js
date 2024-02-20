function getDiscriminantPropertyAccess(expr, computedType) {
                    const type = declaredType.flags & 1048576 /* Union */ ? declaredType : computedType;
                    if (type.flags & 1048576 /* Union */) {
                        const access = getCandidateDiscriminantPropertyAccess(expr);
                        if (access) {
                            const name = getAccessedPropertyName(access);
                            if (name && isDiscriminantProperty(type, name)) {
                                return access;
                            }
                        }
                    }
                    return void 0;
                }