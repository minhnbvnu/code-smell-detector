function couldContainTypeVariables(type) {
                const objectFlags = getObjectFlags(type);
                if (objectFlags & 524288 /* CouldContainTypeVariablesComputed */) {
                    return !!(objectFlags & 1048576 /* CouldContainTypeVariables */);
                }
                const result = !!(type.flags & 465829888 /* Instantiable */ || type.flags & 524288 /* Object */ && !isNonGenericTopLevelType(type) && (objectFlags & 4 /* Reference */ && (type.node || forEach(getTypeArguments(type), couldContainTypeVariables)) || objectFlags & 16 /* Anonymous */ && type.symbol && type.symbol.flags & (16 /* Function */ | 8192 /* Method */ | 32 /* Class */ | 2048 /* TypeLiteral */ | 4096 /* ObjectLiteral */) && type.symbol.declarations || objectFlags & (32 /* Mapped */ | 1024 /* ReverseMapped */ | 4194304 /* ObjectRestType */ | 8388608 /* InstantiationExpressionType */)) || type.flags & 3145728 /* UnionOrIntersection */ && !(type.flags & 1024 /* EnumLiteral */) && !isNonGenericTopLevelType(type) && some(type.types, couldContainTypeVariables));
                if (type.flags & 3899393 /* ObjectFlagsType */) {
                    type.objectFlags |= 524288 /* CouldContainTypeVariablesComputed */ | (result ? 1048576 /* CouldContainTypeVariables */ : 0);
                }
                return result;
            }