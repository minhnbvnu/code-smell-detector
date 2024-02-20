function getNarrowedType(type, candidate, assumeTrue, checkDerived) {
                    var _a3;
                    const key2 = type.flags & 1048576 /* Union */ ? `N${getTypeId(type)},${getTypeId(candidate)},${(assumeTrue ? 1 : 0) | (checkDerived ? 2 : 0)}` : void 0;
                    return (_a3 = getCachedType(key2)) != null ? _a3 : setCachedType(key2, getNarrowedTypeWorker(type, candidate, assumeTrue, checkDerived));
                }