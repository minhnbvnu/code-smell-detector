function visitType(type) {
                    if (!type) {
                        return;
                    }
                    if (visitedTypes[type.id]) {
                        return;
                    }
                    visitedTypes[type.id] = type;
                    const shouldBail = visitSymbol(type.symbol);
                    if (shouldBail)
                        return;
                    if (type.flags & 524288 /* Object */) {
                        const objectType = type;
                        const objectFlags = objectType.objectFlags;
                        if (objectFlags & 4 /* Reference */) {
                            visitTypeReference(type);
                        }
                        if (objectFlags & 32 /* Mapped */) {
                            visitMappedType(type);
                        }
                        if (objectFlags & (1 /* Class */ | 2 /* Interface */)) {
                            visitInterfaceType(type);
                        }
                        if (objectFlags & (8 /* Tuple */ | 16 /* Anonymous */)) {
                            visitObjectType(objectType);
                        }
                    }
                    if (type.flags & 262144 /* TypeParameter */) {
                        visitTypeParameter(type);
                    }
                    if (type.flags & 3145728 /* UnionOrIntersection */) {
                        visitUnionOrIntersectionType(type);
                    }
                    if (type.flags & 4194304 /* Index */) {
                        visitIndexType(type);
                    }
                    if (type.flags & 8388608 /* IndexedAccess */) {
                        visitIndexedAccessType(type);
                    }
                }