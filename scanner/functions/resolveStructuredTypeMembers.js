function resolveStructuredTypeMembers(type) {
                if (!type.members) {
                    if (type.flags & 524288 /* Object */) {
                        if (type.objectFlags & 4 /* Reference */) {
                            resolveTypeReferenceMembers(type);
                        }
                        else if (type.objectFlags & 3 /* ClassOrInterface */) {
                            resolveClassOrInterfaceMembers(type);
                        }
                        else if (type.objectFlags & 1024 /* ReverseMapped */) {
                            resolveReverseMappedTypeMembers(type);
                        }
                        else if (type.objectFlags & 16 /* Anonymous */) {
                            resolveAnonymousTypeMembers(type);
                        }
                        else if (type.objectFlags & 32 /* Mapped */) {
                            resolveMappedTypeMembers(type);
                        }
                        else {
                            Debug.fail("Unhandled object type " + Debug.formatObjectFlags(type.objectFlags));
                        }
                    }
                    else if (type.flags & 1048576 /* Union */) {
                        resolveUnionTypeMembers(type);
                    }
                    else if (type.flags & 2097152 /* Intersection */) {
                        resolveIntersectionTypeMembers(type);
                    }
                    else {
                        Debug.fail("Unhandled type " + Debug.formatTypeFlags(type.flags));
                    }
                }
                return type;
            }