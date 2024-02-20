function formatUnionTypes(types) {
                const result = [];
                let flags = 0;
                for (let i = 0; i < types.length; i++) {
                    const t = types[i];
                    flags |= t.flags;
                    if (!(t.flags & 98304 /* Nullable */)) {
                        if (t.flags & (512 /* BooleanLiteral */ | 1056 /* EnumLike */)) {
                            const baseType = t.flags & 512 /* BooleanLiteral */ ? booleanType : getBaseTypeOfEnumLikeType(t);
                            if (baseType.flags & 1048576 /* Union */) {
                                const count = baseType.types.length;
                                if (i + count <= types.length && getRegularTypeOfLiteralType(types[i + count - 1]) === getRegularTypeOfLiteralType(baseType.types[count - 1])) {
                                    result.push(baseType);
                                    i += count - 1;
                                    continue;
                                }
                            }
                        }
                        result.push(t);
                    }
                }
                if (flags & 65536 /* Null */)
                    result.push(nullType);
                if (flags & 32768 /* Undefined */)
                    result.push(undefinedType);
                return result || types;
            }